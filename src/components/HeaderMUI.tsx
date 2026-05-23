import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderMUIProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function HeaderMUI({
  title,
  onMenuClick,
  userName,
  onLogout,
}: HeaderMUIProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1B8C3E' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {userName && (
            <Typography variant="body2" sx={{ color: 'white' }}>
              {userName}
            </Typography>
          )}
          {onLogout && (
            <Button
              color="inherit"
              onClick={onLogout}
              sx={{
                backgroundColor: '#ff6b6b',
                '&:hover': {
                  backgroundColor: '#ff5252',
                },
                px: 2,
                py: 1,
              }}
            >
              Déconnexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
