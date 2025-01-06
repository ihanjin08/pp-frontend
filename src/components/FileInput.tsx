import React from 'react';

interface FileInputProps {
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ multiple = false, onFilesSelected }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    onFilesSelected(files);
  };

  return <input type="file" multiple={multiple} onChange={handleChange} />;
};

export default FileInput;
