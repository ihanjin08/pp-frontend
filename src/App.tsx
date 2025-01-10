import React, { useState } from 'react';
import FileInput from './components/FileInput';
import Grading from './components/Grading';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <div>
      <FileInput multiple={false} onFilesSelected={handleFiles} />
      <Grading file={selectedFile} /> {}
    </div>
  );
};

export default App;