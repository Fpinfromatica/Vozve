import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, RadioGroup, FormControlLabel, Radio, Grid, LinearProgress } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';

const PollsPage: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const polls = [
    {
      id: 1,
      question: '¿Cuál crees que es el principal problema de Venezuela?',
      options: [
        { label: 'Economía', votes: 4500, percent: 45 },
        { label: 'Salud', votes: 2100, percent: 21 },
        { label: 'Educación', votes: 1800, percent: 18 },
        { label: 'Seguridad', votes: 1600, percent: 16 },
      ],
    },
    {
      id: 2,
      question: '¿Qué tipo de contenido prefieres en VozVE?',
      options: [
        { label: 'Noticias', votes: 3200, percent: 40 },
        { label: 'Análisis Profundo', votes: 2400, percent: 30 },
        { label: 'Reportajes', votes: 1600, percent: 20 },
        { label: 'Entrevistas', votes: 800, percent: 10 },
      ],
    },
  ];

  const handleVote = (pollId: number, option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [pollId]: option });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        📊 Encuestas de Opinión Pública
      </Typography>
      <Grid container spacing={3}>
        {polls.map((poll) => (
          <Grid item xs={12} key={poll.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  {poll.question}
                </Typography>
                <RadioGroup
                  value={selectedAnswers[poll.id] || ''}
                  onChange={(e) => handleVote(poll.id, e.target.value)}
                >
                  {poll.options.map((option, idx) => (
                    <Box key={idx} sx={{ mb: 2 }}>
                      <FormControlLabel
                        value={option.label}
                        control={<Radio />}
                        label={option.label}
                      />
                      <LinearProgress
                        variant="determinate"
                        value={option.percent}
                        sx={{ mt: 1, mb: 1 }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {option.votes} votos ({option.percent}%)
                      </Typography>
                    </Box>
                  ))}
                </RadioGroup>
                <Button variant="contained" sx={{ mt: 3 }}>
                  Enviar Respuesta
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PollsPage;
