#!/bin/bash

# Script para migrar la base de datos

echo "🔄 Migrando base de datos VozVE..."

# Conexión a PostgreSQL
PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -f schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Migración completada exitosamente"
    
    # Ejecutar seed opcional
    if [ "$RUN_SEED" = "true" ]; then
        echo "🌱 Insertando datos de prueba..."
        PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -f seed.sql
        echo "✅ Datos de prueba insertados"
    fi
else
    echo "❌ Error en la migración"
    exit 1
fi
