import { AppBar, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Help } from '@mui/icons-material';
import { useState } from 'react';
import { SecureChip } from './SecureChip';

export const HeaderBar = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  const handleHelpOpen = () => setHelpOpen(true);
  const handleHelpClose = () => setHelpOpen(false);

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EOFDR Copilot
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SecureChip />
            <IconButton color="inherit" onClick={handleHelpOpen}>
              <Help />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={helpOpen} onClose={handleHelpClose} maxWidth="sm" fullWidth>
        <DialogTitle>Help & Instructions</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Welcome to EOFDR Copilot - a government-grade forensic workspace.
          </Typography>
          <Typography variant="body2" component="div">
            <ul>
              <li>Use the search functionality to find evidence and case data</li>
              <li>Navigate through different sections using the menu</li>
              <li>Generate reports and export findings as needed</li>
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHelpClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
