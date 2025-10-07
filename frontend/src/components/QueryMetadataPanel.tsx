import { Card, CardContent, CardHeader, Typography, Button, Box, Chip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface QueryMetadataPanelProps {
  query: string;
  mode: string;
  dsl?: string;
  dataset?: string;
  took_ms?: number;
}

export const QueryMetadataPanel = ({ 
  query, 
  mode, 
  dsl, 
  dataset, 
  took_ms 
}: QueryMetadataPanelProps) => {
  const navigate = useNavigate();

  const handleEditQuery = () => {
    // Navigate back to home with query prefilled
    const params = new URLSearchParams({ query });
    navigate(`/?${params.toString()}`);
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 2, height: 'fit-content' }}>
      <CardHeader 
        title="Query Details" 
        titleTypographyProps={{ fontSize: 18, fontWeight: 600 }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              User Query
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 14 }}>
              "{query}"
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Mode
            </Typography>
            <Chip 
              label={mode} 
              size="small" 
              color={mode === 'natural' ? 'primary' : 'secondary'}
              variant="outlined"
            />
          </Box>

          {dsl && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Parsed DSL
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: 13, 
                  fontFamily: 'monospace',
                  backgroundColor: 'grey.100',
                  p: 1,
                  borderRadius: 1,
                  wordBreak: 'break-all'
                }}
              >
                {dsl}
              </Typography>
            </Box>
          )}

          {dataset && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Dataset
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {dataset}
              </Typography>
            </Box>
          )}

          {took_ms !== undefined && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Time Taken
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {took_ms}ms
              </Typography>
            </Box>
          )}

          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleEditQuery}
            size="small"
            sx={{ mt: 2 }}
          >
            Edit Query
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
