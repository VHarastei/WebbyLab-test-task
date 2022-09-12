import { Box, Button, Paper, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Api } from '../api';
import { validateMoviesImport } from '../common/validateMoviesImport';
import { UIContext } from '../components/UIContextProvider';
import { ResultCodes } from '../types';

export const ImportMoviePage = () => {
  const { setAlert } = useContext(UIContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('movies', selectedFile);

    const text = await selectedFile.text();

    const isTextValid = await validateMoviesImport(text);

    if (!isTextValid) {
      setAlert({
        show: true,
        message: 'File is not valid, please download an example file',
        severity: 'error',
      });

      return;
    }

    setIsLoading(true);
    try {
      const { meta, status } = await Api.importMovies(formData);

      if (!meta || status !== ResultCodes.SUCCESS) {
        throw new Error('Something went wrong');
      }

      setAlert({
        show: true,
        message: `Successfully imported ${meta.imported} movies`,
        severity: 'success',
      });
    } catch (error: any) {
      setAlert({
        show: true,
        message: error.toString(),
        severity: 'error',
      });
    }
    setIsLoading(false);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const currentFile = files[0];
    if (currentFile.type === 'text/plain') {
      setSelectedFile(files[0]);
    } else {
      // workaround https://stackoverflow.com/a/42192710/15793754
      event.target.value = '';

      setAlert({
        show: true,
        message: 'File should be .txt',
        severity: 'error',
      });
    }
  };

  const handleDownloadExample = () => {
    window.open(
      'https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad/archive/cca50e86dd745c158491adf35bb212d322d58260.zip'
    );
  };

  return (
    <Paper>
      <Box display="flex" flexDirection="column" gap={2} p={2} my={2}>
        <form onSubmit={handleSubmit}>
          <Typography gutterBottom fontWeight="700" fontSize={24} color="primary">
            Select File
          </Typography>
          <input type="file" onChange={handleFileSelect} accept="text/plain" />
          <Button disabled={!selectedFile || isLoading} type="submit" variant="contained">
            Import
          </Button>
        </form>
        <Box>
          <Typography gutterBottom fontWeight="700" fontSize={24} color="primary">
            Look at an example file
          </Typography>
          <Button variant="contained" onClick={handleDownloadExample}>
            Download example file
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
