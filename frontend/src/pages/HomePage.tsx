import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';

const HomePage: React.FC = () => {
  const newsMock = [
    {
      id: 1,
      title: 'Crisis Económica en Venezuela: Nuevos Datos',
      content: 'Los datos más recientes muestran una agravamiento de la situación económica...',
      author: 'Periodista A',
      date: '2024-01-10',
    },
    {
      id: 2,
      title: 'Manifestaciones Ciudadanas: Cientos se Reúnen',
      content: 'Miles de ciudadanos se reúnen para exigir cambios políticos...',
      author: 'Periodista B',
      date: '2024-01-09',
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        📰 Noticias de Venezuela
      </Typography>
      <Grid container spacing={3}>
        {newsMock.map((news) => (
          <Grid item xs={12} sm={6} md={4} key={news.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {news.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {news.content}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
                  Por {news.author}
                </Typography>
                <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 2 }}>
                  {news.date}
                </Typography>
                <Button variant="contained" size="small">
                  Leer más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
