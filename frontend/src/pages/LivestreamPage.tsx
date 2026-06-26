import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const LivestreamPage: React.FC = () => {
  const livestreams = [
    {
      id: 1,
      title: 'Transmisión Especial: Situación Política',
      journalist: 'Periodista Carlos',
      viewers: 5420,
      isLive: true,
    },
    {
      id: 2,
      title: 'Reportaje desde la calle',
      journalist: 'Periodista María',
      viewers: 2100,
      isLive: true,
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        📺 Transmisiones en Vivo
      </Typography>
      <Grid container spacing={3}>
        {livestreams.map((stream) => (
          <Grid item xs={12} sm={6} md={4} key={stream.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {stream.isLive && (
                    <Box sx={{ width: 12, height: 12, bgcolor: 'red', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                  )}
                  <Typography variant="caption" color="error">
                    {stream.isLive ? 'EN VIVO' : 'Grabado'}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {stream.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {stream.journalist}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 2 }}>
                  👁️ {stream.viewers} espectadores
                </Typography>
                <Button variant="contained" fullWidth startIcon={<PlayArrowIcon />}>
                  Ver Transmisión
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LivestreamPage;
