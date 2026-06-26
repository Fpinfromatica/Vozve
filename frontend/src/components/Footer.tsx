import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#333', color: 'white', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2024 VozVE - Periodismo Sin Censura. Todos los derechos reservados.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Hecho con ❤️ para la libertad de expresión en Venezuela
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
