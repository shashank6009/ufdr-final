import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Box, 
  Chip, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { FileDownload, Close } from '@mui/icons-material';
import { saveAs } from 'file-saver';

interface Entity {
  type: string;
  value: string;
  risk: 'high' | 'medium' | 'low';
}

interface Result {
  id: string;
  sender: string;
  receiver: string;
  app: string;
  timestamp: string;
  text: string;
  entities: Entity[];
}

interface ResultsTableProps {
  results: Result[];
  onSelectRows?: (ids: string[]) => void;
  selectedIds?: string[];
  onGenerateReport?: (selectedRows: Result[]) => void;
}

export const ResultsTable = ({ results, onSelectRows, selectedIds = [], onGenerateReport }: ResultsTableProps) => {
  const [selectedRow, setSelectedRow] = useState<Result | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row as Result);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedRow(null);
  };

  const handleGenerateReport = () => {
    const selectedRows = results.filter(result => selectedIds.includes(result.id));
    onGenerateReport?.(selectedRows);
  };

  const handleExportCSV = () => {
    const csvData = results.map(result => ({
      Sender: result.sender,
      Receiver: result.receiver,
      App: result.app,
      Timestamp: result.timestamp,
      Text: result.text,
      Entities: result.entities.map(e => `${e.type}:${e.value}`).join(';')
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `search-results-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const renderEntities = (entities: Entity[]) => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {entities.map((entity, index) => (
          <Chip
            key={index}
            label={`${entity.type}: ${entity.value}`}
            size="small"
            color={
              entity.risk === 'high' ? 'error' :
              entity.risk === 'medium' ? 'warning' : 'default'
            }
            variant="outlined"
            sx={{ fontSize: 11 }}
          />
        ))}
      </Box>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'sender',
      headerName: 'Sender',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: 14 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'receiver',
      headerName: 'Receiver',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: 14 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'app',
      headerName: 'App',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: 14 }}>
          {new Date(params.value).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'text',
      headerName: 'Text',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: 14,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'entities',
      headerName: 'Entities',
      width: 200,
      renderCell: (params) => renderEntities(params.value),
    },
  ];

  return (
    <>
      <Card elevation={1} sx={{ borderRadius: 2, height: 'fit-content' }}>
        <CardHeader 
          title="Search Results" 
          titleTypographyProps={{ fontSize: 18, fontWeight: 600 }}
          action={
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {results.length} results
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FileDownload />}
                onClick={handleExportCSV}
                disabled={results.length === 0}
              >
                Export CSV
              </Button>
            </Box>
          }
        />
        <CardContent sx={{ p: 0 }}>
          {/* Selection Toolbar */}
          {selectedIds.length > 0 && (
            <Box sx={{ 
              p: 2, 
              borderBottom: '1px solid #e0e0e0', 
              backgroundColor: '#f8f9fa',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">
                Selected {selectedIds.length} rows
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={handleGenerateReport}
                disabled={selectedIds.length === 0}
              >
                Generate Report
              </Button>
            </Box>
          )}
          
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={results}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick={false}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              onRowClick={handleRowClick}
              selectionModel={selectedIds}
              onSelectionModelChange={(newSelection) => {
                onSelectRows?.(newSelection as string[]);
              }}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f9fa',
                  borderBottom: '2px solid #e0e0e0',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Result Details
            <IconButton onClick={handleCloseDetails}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box sx={{ mt: 2 }}>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: 16, 
                borderRadius: 8, 
                overflow: 'auto',
                fontSize: 14,
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(selectedRow, null, 2)}
              </pre>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
