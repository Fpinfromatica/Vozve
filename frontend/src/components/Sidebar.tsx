import React from 'react';
import { Box, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Box sx={{ width: 250, bgcolor: '#f5f5f5', p: 2, minHeight: '100vh' }}>
      <List>
        <ListItem component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="🏠 Inicio" />
        </ListItem>
        <ListItem component={Link} to="/livestream" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="📺 Transmisiones" />
        </ListItem>
        <ListItem component={Link} to="/forums" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="💬 Foros" />
        </ListItem>
        <ListItem component={Link} to="/polls" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="📊 Encuestas" />
        </ListItem>
        <ListItem component={Link} to="/analytics" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="📈 Análisis" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
