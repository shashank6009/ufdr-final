import { 
  Typography, 
  Box, 
  Alert, 
  Skeleton, 
  Snackbar,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { query, getEntities } from '../api/client';
import { QueryMetadataPanel } from '../components/QueryMetadataPanel';
import { ResultsTable } from '../components/ResultsTable';
import { EntitiesSidebar } from '../components/EntitiesSidebar';
import { ReportDialog } from '../components/ReportDialog';
import { generateReportPDF } from '../utils/reportPDF';

export const Results = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const mode = searchParams.get('mode') || 'natural';
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState<any[]>([]);

  // Fetch query results
  const { 
    data: queryData, 
    isLoading: queryLoading, 
    error: queryError 
  } = useQuery({
    queryKey: ['query', queryParam, mode],
    queryFn: () => query(queryParam, mode),
    enabled: !!queryParam,
  });

  // Fetch entities after query results are available
  const { 
    data: entitiesData, 
    isLoading: entitiesLoading 
  } = useQuery({
    queryKey: ['entities', queryData?.queryId],
    queryFn: () => getEntities(queryData?.queryId),
    enabled: !!queryData?.queryId,
  });

  const handleCloseError = () => {
    setError(null);
  };

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log('Generate report clicked');
  };

  const handleSelectRows = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleGenerateReportFromTable = (selectedRows: any[]) => {
    setSelectedRowsData(selectedRows);
    setReportDialogOpen(true);
  };

  const handleGenerateReportFromDialog = (selectedRowsData: any[], options: any) => {
    if (!queryData) return;

    const reportData = {
      query: queryData.originalQuery || queryParam,
      mode: queryData.mode || mode,
      queryId: queryData.queryId,
      dataset: queryData.dataset || 'unknown',
      totalResults: queryData.results?.length || 0,
      selectedResults: selectedRowsData,
      options,
      generatedAt: new Date().toLocaleString(),
    };

    try {
      generateReportPDF(reportData);
    } catch (err) {
      setError('Failed to generate PDF report');
      console.error('PDF generation error:', err);
    }
  };

  if (queryError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to fetch search results: {queryError instanceof Error ? queryError.message : 'Unknown error'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F6F7F8' }}>
      {/* Top App Bar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Search Results
          </Typography>
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            disabled={!queryData?.results?.length}
            sx={{ ml: 2 }}
          >
            Generate Report
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {queryLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="rectangular" height={400} />
            <Skeleton variant="rectangular" height={300} />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '280px 1fr 280px' },
              gap: 2,
              maxWidth: '100%',
            }}
          >
            {/* Left: Query Metadata Panel */}
            <Box sx={{ order: { xs: 1, lg: 1 } }}>
              {queryData ? (
                <QueryMetadataPanel
                  query={queryData.originalQuery || queryParam}
                  mode={queryData.mode || mode}
                  dsl={queryData.dsl}
                  dataset={queryData.dataset}
                  took_ms={queryData.meta?.took_ms}
                />
              ) : (
                <Skeleton variant="rectangular" height={300} />
              )}
            </Box>

            {/* Center: Results Table */}
            <Box sx={{ order: { xs: 2, lg: 2 } }}>
              {queryData ? (
                <ResultsTable 
                  results={queryData.results || []}
                  selectedIds={selectedIds}
                  onSelectRows={handleSelectRows}
                  onGenerateReport={handleGenerateReportFromTable}
                />
              ) : (
                <Skeleton variant="rectangular" height={500} />
              )}
            </Box>

            {/* Right: Entities Sidebar */}
            <Box sx={{ order: { xs: 3, lg: 3 } }}>
              {entitiesLoading ? (
                <Skeleton variant="rectangular" height={400} />
              ) : (
                <EntitiesSidebar entities={entitiesData || {}} />
              )}
            </Box>
          </Box>
        )}
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

      <ReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        onGenerate={handleGenerateReportFromDialog}
        selectedRowsData={selectedRowsData}
      />
    </Box>
  );
};
