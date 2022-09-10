import { Box, Button, Paper } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Api } from '../api';

export const ImportMoviePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('movies', selectedFile);

    try {
      await Api.importMovies(formData);
      alert('Movies successfully imported');
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) setSelectedFile(files[0]);
  };

  return (
    <Paper>
      <Box p={2} my={2}>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileSelect} />
          <Button disabled={!selectedFile} type="submit" variant="contained">
            Import
          </Button>
        </form>
      </Box>
    </Paper>
  );
};
