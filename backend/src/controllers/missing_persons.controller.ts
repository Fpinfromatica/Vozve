import { Request, Response } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export class MissingPersonsController {
  // Obtener todas las personas desaparecidas
  async getAllMissingPersons(req: AuthRequest, res: Response) {
    try {
      const { status = 'active', search, page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      let query = 'SELECT * FROM missing_persons WHERE case_status = $1';
      const params: any[] = [status];

      if (search) {
        query += ` AND (first_name ILIKE $${params.length + 1} OR last_name ILIKE $${params.length + 2} OR disappearance_location ILIKE $${params.length + 3})`;
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      query += ` ORDER BY disappearance_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(Number(limit), offset);

      const result = await pool.query(query, params);

      res.json({
        data: result.rows,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: result.rows.length,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener personas desaparecidas' });
    }
  }

  // Obtener persona desaparecida por ID
  async getMissingPersonById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'SELECT * FROM missing_persons WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }

      // Incrementar contador de vistas
      await pool.query(
        'UPDATE missing_persons SET views_count = views_count + 1 WHERE id = $1',
        [id]
      );

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener persona desaparecida' });
    }
  }

  // Crear reporte de persona desaparecida
  async createMissingPersonReport(req: AuthRequest, res: Response) {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        height,
        weight,
        skinColor,
        hairColor,
        distinctiveMarks,
        disappearanceDate,
        disappearanceLocation,
        lastKnownOutfit,
        reporterRelationship,
        contactPhone,
        rewardOffered,
        rewardAmount,
        additionalInfo,
      } = req.body;

      const missingPersonId = uuidv4();
      const caseNumber = `VOZVE-${Date.now()}`;

      const result = await pool.query(
        `INSERT INTO missing_persons (
          id, first_name, last_name, date_of_birth, gender, height, weight,
          skin_color, hair_color, distinctive_marks, disappearance_date,
          disappearance_location, last_known_outfit, reporter_id,
          reporter_relationship, contact_phone, contact_email, reward_offered,
          reward_amount, additional_info, case_number, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, NOW(), NOW())
        RETURNING *`,
        [
          missingPersonId,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          height,
          weight,
          skinColor,
          hairColor,
          distinctiveMarks,
          disappearanceDate,
          disappearanceLocation,
          lastKnownOutfit,
          req.userId,
          reporterRelationship,
          contactPhone,
          req.user?.email,
          rewardOffered,
          rewardAmount,
          additionalInfo,
          caseNumber,
        ]
      );

      // Enviar alertas a usuarios cercanos
      await this.sendLocationBasedAlerts(result.rows[0]);

      res.status(201).json({
        message: 'Caso de persona desaparecida creado exitosamente',
        caseNumber: caseNumber,
        case: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear reporte de persona desaparecida' });
    }
  }

  // Subir fotografía de persona desaparecida
  async uploadMissingPersonPhoto(req: AuthRequest, res: Response) {
    try {
      const { missingPersonId } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No se proporcionó archivo' });
      }

      // Verificar que el usuario es el reportero
      const checkResult = await pool.query(
        'SELECT reporter_id FROM missing_persons WHERE id = $1',
        [missingPersonId]
      );

      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }

      if (checkResult.rows[0].reporter_id !== req.userId) {
        return res.status(403).json({ error: 'No tienes permiso para subir fotos' });
      }

      // Subir a S3
      const key = `missing-persons/${missingPersonId}/${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET || 'vozve-media',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const uploadResult = await s3.upload(params).promise();

      // Actualizar BD
      await pool.query(
        `UPDATE missing_persons SET photo_url = $1 WHERE id = $2`,
        [uploadResult.Location, missingPersonId]
      );

      res.json({
        message: 'Foto subida exitosamente',
        photoUrl: uploadResult.Location,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al subir fotografía' });
    }
  }

  // Enviar pista sobre persona desaparecida
  async submitTip(req: AuthRequest, res: Response) {
    try {
      const { missingPersonId } = req.params;
      const {
        tipTitle,
        tipDescription,
        tipLocation,
        tipDate,
        tipType,
        contactPhone,
        anonymous,
      } = req.body;

      const tipId = uuidv4();

      const result = await pool.query(
        `INSERT INTO missing_person_tips (
          id, missing_person_id, provider_id, tip_title, tip_description,
          tip_location, tip_date, tip_type, anonymous, contact_phone,
          contact_email, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        RETURNING *`,
        [
          tipId,
          missingPersonId,
          !anonymous ? req.userId : null,
          tipTitle,
          tipDescription,
          tipLocation,
          tipDate,
          tipType,
          anonymous,
          contactPhone,
          req.user?.email,
        ]
      );

      // Incrementar contador de pistas
      await pool.query(
        'UPDATE missing_persons SET tips_received = tips_received + 1 WHERE id = $1',
        [missingPersonId]
      );

      res.status(201).json({
        message: 'Pista enviada exitosamente',
        tip: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al enviar pista' });
    }
  }

  // Obtener pistas de persona desaparecida
  async getTips(req: AuthRequest, res: Response) {
    try {
      const { missingPersonId } = req.params;

      const result = await pool.query(
        `SELECT * FROM missing_person_tips 
         WHERE missing_person_id = $1 
         ORDER BY created_at DESC`,
        [missingPersonId]
      );

      res.json({
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener pistas' });
    }
  }

  // Registrarse como voluntario de búsqueda
  async registerSearchVolunteer(req: AuthRequest, res: Response) {
    try {
      const { missingPersonId } = req.params;
      const { searchLocation, searchDate, hoursVolunteered } = req.body;

      const volunteerId = uuidv4();

      const result = await pool.query(
        `INSERT INTO search_volunteers (
          id, missing_person_id, volunteer_id, search_location, search_date,
          hours_volunteered, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING *`,
        [
          volunteerId,
          missingPersonId,
          req.userId,
          searchLocation,
          searchDate,
          hoursVolunteered,
        ]
      );

      res.status(201).json({
        message: 'Voluntario registrado exitosamente',
        volunteer: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar voluntario' });
    }
  }

  // Obtener estadísticas del caso
  async getCaseStatistics(req: AuthRequest, res: Response) {
    try {
      const { missingPersonId } = req.params;

      const caseData = await pool.query(
        'SELECT * FROM missing_persons WHERE id = $1',
        [missingPersonId]
      );

      const tips = await pool.query(
        'SELECT COUNT(*) as count FROM missing_person_tips WHERE missing_person_id = $1',
        [missingPersonId]
      );

      const volunteers = await pool.query(
        'SELECT COUNT(*) as count FROM search_volunteers WHERE missing_person_id = $1',
        [missingPersonId]
      );

      const updates = await pool.query(
        'SELECT COUNT(*) as count FROM missing_person_updates WHERE missing_person_id = $1',
        [missingPersonId]
      );

      res.json({
        case: caseData.rows[0],
        statistics: {
          views: caseData.rows[0]?.views_count || 0,
          shares: caseData.rows[0]?.shared_count || 0,
          tips: parseInt(tips.rows[0]?.count || 0),
          volunteers: parseInt(volunteers.rows[0]?.count || 0),
          updates: parseInt(updates.rows[0]?.count || 0),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
  }

  // Marcar caso como resuelto
  async resolveMissingPersonCase(req: AuthRequest, res: Response) {
    try {
      const { missingPersonId } = req.params;
      const { resolutionDetails, foundStatus } = req.body;

      // Verificar permisos (solo el reportero o admin)
      const checkResult = await pool.query(
        'SELECT reporter_id FROM missing_persons WHERE id = $1',
        [missingPersonId]
      );

      if (checkResult.rows[0].reporter_id !== req.userId) {
        return res.status(403).json({ error: 'No tienes permiso' });
      }

      const result = await pool.query(
        `UPDATE missing_persons 
         SET case_status = $1, case_resolved_date = NOW(), resolution_details = $2
         WHERE id = $3
         RETURNING *`,
        [foundStatus ? 'resolved_found' : 'resolved_not_found', resolutionDetails, missingPersonId]
      );

      res.json({
        message: 'Caso actualizado exitosamente',
        case: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al resolver caso' });
    }
  }

  // Enviar alertas basadas en ubicación
  private async sendLocationBasedAlerts(missingPerson: any) {
    try {
      // Esta función enviaría notificaciones push a usuarios en el área
      // Implementación con Firebase Cloud Messaging
      console.log(`📍 Alerta enviada para: ${missingPerson.first_name} ${missingPerson.last_name}`);
    } catch (error) {
      console.error('Error al enviar alertas:', error);
    }
  }
}

export default new MissingPersonsController();
