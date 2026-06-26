import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = React.useState({
    fullName: 'Juan Pérez',
    email: 'juan@example.com',
    phoneNumber: '+58 412 1234567',
    bio: 'Periodista independiente',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        👤 Mi Perfil
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Nombre Completo"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Teléfono"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Biografía"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" sx={{ mt: 3 }}>
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔐 Seguridad
              </Typography>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                Cambiar Contraseña
              </Button>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                Habilitar Autenticación Biométrica
              </Button>
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                📢 Notificaciones
              </Typography>
              <Button variant="outlined" fullWidth>
                Configurar Notificaciones
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
