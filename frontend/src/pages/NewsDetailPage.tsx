import React from 'react';
import { Box, Typography } from '@mui/material';

const NewsDetailPage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Detalle de Noticia
      </Typography>
      <Typography variant="body1">
        Contenido detallado de la noticia...
      </Typography>
    </Box>
  );
};

export default NewsDetailPage;
