import { Card, CardContent, CardHeader, Typography, Box, Chip, Badge } from '@mui/material';

interface EntityValue {
  value: string;
  count: number;
}

interface EntitiesSidebarProps {
  entities: Record<string, EntityValue[]>;
}

export const EntitiesSidebar = ({ entities }: EntitiesSidebarProps) => {
  const handleEntityClick = (entityType: string, value: string) => {
    console.log(`Clicked entity: ${entityType} - ${value}`);
    // TODO: Implement row highlighting in table
  };

  const getEntityTypeColor = (entityType: string) => {
    switch (entityType) {
      case 'BTC':
      case 'ETH':
        return 'warning';
      case 'UAE_phone':
        return 'info';
      case 'ProtonMail':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getEntityTypeIcon = (entityType: string) => {
    switch (entityType) {
      case 'BTC':
      case 'ETH':
        return '₿';
      case 'UAE_phone':
        return '📱';
      case 'ProtonMail':
        return '📧';
      default:
        return '🏷️';
    }
  };

  return (
    <Box sx={{ maxHeight: '80vh', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
        Extracted Entities
      </Typography>
      
      {Object.keys(entities).length === 0 ? (
        <Card elevation={1} sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No entities found
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(entities).map(([entityType, values]) => (
            <Card key={entityType} elevation={1} sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 600 }}>
                      {getEntityTypeIcon(entityType)} {entityType}
                    </Typography>
                    <Badge 
                      badgeContent={values.length} 
                      color="primary"
                      sx={{ '& .MuiBadge-badge': { fontSize: 11 } }}
                    />
                  </Box>
                }
                titleTypographyProps={{ fontSize: 16 }}
                sx={{ pb: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {values.map((entity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: 'grey.50',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'grey.100',
                        },
                      }}
                      onClick={() => handleEntityClick(entityType, entity.value)}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: 13,
                          fontFamily: entityType.includes('phone') ? 'monospace' : 'inherit',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {entity.value}
                      </Typography>
                      <Chip
                        label={entity.count}
                        size="small"
                        color={getEntityTypeColor(entityType)}
                        variant="outlined"
                        sx={{ ml: 1, minWidth: 24, height: 20, fontSize: 11 }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};
