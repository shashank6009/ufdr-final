import { useState, useRef, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  onSubmit: (query: string, mode: string) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const SearchBar = ({ onSubmit, loading = false, disabled = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('natural');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (!query.trim()) return;
    
    try {
      onSubmit(query.trim(), mode);
    } catch (err) {
      setError('Error contacting analysis engine.');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    } else if (event.key === 'Escape') {
      setQuery('');
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: string | null) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { xs: 'stretch', md: 'center' } }}>
        <TextField
          ref={inputRef}
          fullWidth
          variant="outlined"
          placeholder="Type your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!query.trim() || loading}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
          }}
        />
        
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="search mode"
          size="small"
          sx={{ 
            minWidth: { xs: '100%', md: 'auto' },
            '& .MuiToggleButton-root': {
              px: 3,
              py: 1.5,
            },
          }}
        >
          <ToggleButton value="natural" aria-label="natural language">
            Natural
          </ToggleButton>
          <ToggleButton value="filter" aria-label="filter mode">
            Filter
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
