import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, fullName, phoneNumber } = req.body;

      // Validar email único
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Email ya registrado' });
      }

      // Encriptar contraseña
      const hashedPassword = await bcryptjs.hash(password, 10);
      const userId = uuidv4();
      const createdAt = new Date();

      // Crear usuario
      const result = await pool.query(
        `INSERT INTO users (id, email, password_hash, full_name, phone_number, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, email, full_name`,
        [userId, email, hashedPassword, fullName, phoneNumber, createdAt, createdAt]
      );

      // Generar JWT
      const token = jwt.sign(
        { userId: result.rows[0].id, email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRATION || '7d' }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token,
        user: result.rows[0]
      });
    } catch (error) {
      res.status(500).json({ error: 'Error en el registro' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Buscar usuario
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = result.rows[0];

      // Verificar contraseña
      const passwordMatch = await bcryptjs.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRATION || '7d' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error en el login' });
    }
  }

  async biometricAuth(req: Request, res: Response) {
    try {
      const { userId, biometricData } = req.body;

      // Validar biometría (simplificado)
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1 AND biometric_enabled = true',
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Biometría no disponible' });
      }

      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRATION || '7d' }
      );

      res.json({ token, message: 'Autenticación biométrica exitosa' });
    } catch (error) {
      res.status(500).json({ error: 'Error en autenticación biométrica' });
    }
  }
}

export default new AuthController();
