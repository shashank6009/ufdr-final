import { Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getHealth, query } from '../api/client';
import { SearchBar } from '../components/SearchBar';
import { ExampleQueries } from '../components/ExampleQueries';

export const Home = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: healthData, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
  });

  const handleSearch = async (searchQuery: string, mode: string) => {
    setIsSearching(true);
    try {
      // Make the API call to get query results
      await query(searchQuery, mode);
      
      // Navigate to results page with query parameters
      const params = new URLSearchParams({
        query: searchQuery,
        mode: mode,
      });
      navigate(`/results?${params.toString()}`);
    } catch (err) {
      console.error('Search failed:', err);
      // Error handling is done in SearchBar component
    } finally {
      setIsSearching(false);
    }
  };

  const handleExampleSelect = (exampleQuery: string) => {
    handleSearch(exampleQuery, 'natural');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Search Digital Evidence
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Ask in plain language or switch to filter mode.
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <SearchBar 
          onSubmit={handleSearch}
          loading={isSearching}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <ExampleQueries onSelect={handleExampleSelect} />
      </Box>
      
      <Box sx={{ mt: 4 }}>
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">Checking API connection...</Typography>
          </Box>
        )}
        
        {error && (
          <Alert severity="error">
            API: Connection failed - {error instanceof Error ? error.message : 'Unknown error'}
          </Alert>
        )}
        
        {healthData && (
          <Alert severity="success">
            API: Connected (v{healthData.version || 'unknown'})
          </Alert>
        )}
      </Box>

      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          display: 'block', 
          mt: 3, 
          textAlign: 'center',
          fontSize: 12,
        }}
      >
        All searches processed locally. No data leaves this system.
      </Typography>
    </Box>
  );
};
