import { Box, Chip, Typography } from '@mui/material';

interface ExampleQueriesProps {
  onSelect: (query: string) => void;
}

const exampleQueries = [
  'Show WhatsApp chats with UAE numbers',
  'List calls longer than 30 minutes',
  'Find crypto wallet mentions',
  'Display all deleted messages',
  'Show contacts from last week',
  'Find images with GPS coordinates',
];

export const ExampleQueries = ({ onSelect }: ExampleQueriesProps) => {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Try these examples:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflow: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 4,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 2,
          },
        }}
      >
        {exampleQueries.map((query, index) => (
          <Chip
            key={index}
            label={query}
            variant="outlined"
            onClick={() => onSelect(query)}
            sx={{
              flexShrink: 0,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'secondary.light',
                color: 'secondary.contrastText',
              },
              '&:hover .MuiChip-outlined': {
                borderColor: 'secondary.main',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
