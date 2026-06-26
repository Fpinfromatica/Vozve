import React from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Grid } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

const ForumsPage: React.FC = () => {
  const topics = [
    {
      id: 1,
      title: 'Crisis Económica: ¿Qué soluciones ves?',
      author: 'Usuario123',
      comments: 45,
      likes: 120,
    },
    {
      id: 2,
      title: 'Educación en Venezuela: Desafíos Actuales',
      author: 'ProfesorX',
      comments: 32,
      likes: 89,
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        💬 Foros Activos
      </Typography>
      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} key={topic.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {topic.title}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                  Iniciado por {topic.author}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  💬 {topic.comments} comentarios | 👍 {topic.likes} likes
                </Typography>
                <Button variant="outlined" startIcon={<CommentIcon />}>
                  Participar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ForumsPage;
