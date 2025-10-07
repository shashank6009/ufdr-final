import { Chip } from '@mui/material';
import { Security } from '@mui/icons-material';

export const SecureChip = () => {
  const isMockMode = import.meta.env.VITE_MOCK_MODE === 'true';
  
  if (!isMockMode) {
    return null;
  }

  return (
    <Chip
      icon={<Security />}
      label="Secure Local Mode"
      color="success"
      size="small"
      variant="outlined"
    />
  );
};
