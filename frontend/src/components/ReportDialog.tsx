import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Divider
} from '@mui/material';

interface ReportOptions {
  includeTimeline: boolean;
  includeRawJson: boolean;
}

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (selectedRowsData: any[], options: ReportOptions) => void;
  selectedRowsData: any[];
}

export const ReportDialog = ({ 
  open, 
  onClose, 
  onGenerate, 
  selectedRowsData 
}: ReportDialogProps) => {
  const [options, setOptions] = useState<ReportOptions>({
    includeTimeline: true,
    includeRawJson: false,
  });

  const handleOptionChange = (option: keyof ReportOptions) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({
      ...prev,
      [option]: event.target.checked,
    }));
  };

  const handleGenerate = () => {
    onGenerate(selectedRowsData, options);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Generate Report</DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            You have {selectedRowsData.length} items selected.
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            Report Options
          </Typography>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeTimeline}
                onChange={handleOptionChange('includeTimeline')}
                color="primary"
              />
            }
            label="Include Timeline"
          />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeRawJson}
                onChange={handleOptionChange('includeRawJson')}
                color="primary"
              />
            }
            label="Include Raw JSON"
          />
        </Box>

        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> The report will be generated as a PDF document containing 
            the selected evidence items with the chosen options.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleGenerate} 
          variant="contained"
          disabled={selectedRowsData.length === 0}
        >
          Generate Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};
