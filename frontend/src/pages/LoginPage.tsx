import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Card, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../store/slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', formData);
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      toast.success('¡Sesión iniciada!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            🗣️ VozVE - Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
