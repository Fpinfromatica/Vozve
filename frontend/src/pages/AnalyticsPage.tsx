import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from '@mui/material';

const AnalyticsPage: React.FC = () => {
  const stats = [
    { label: 'Usuarios Totales', value: '125,430' },
    { label: 'Usuarios Activos', value: '42,100' },
    { label: 'Noticias Publicadas', value: '8,540' },
    { label: 'Transmisiones en Vivo', value: '320' },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        📈 Panel de Análisis
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h5">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Crecimiento de Usuarios (Últimos 30 días)
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              {/* Aquí irá el gráfico con Chart.js */}
              <Typography>Gráfico de crecimiento</Typography>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsPage;
