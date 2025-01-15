import React, { useState } from 'react';
import styles from './FileInput.module.css'; // Import the CSS module

interface FileInputProps {
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ multiple = false, onFilesSelected }) => {
  const [fileName, setFileName] = useState<string>('No file chosen'); // State to track selected file name

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    onFilesSelected(files);

    // Update the file name(s)
    if (files.length > 0) {
      // If multiple files are selected, display the number of files
      setFileName(multiple ? `${files.length} files selected` : files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };

  return (
    <div className={styles.fileInputContainer}>
      <input
        id="fileInput"
        className={styles.fileInput}
        type="file"
        multiple={multiple}
        onChange={handleChange}
        accept=".md" // Restrict to .md files only
      />
      <label htmlFor="fileInput" className={styles.fileLabel}>
        Choose File
      </label>
      {/* Display the selected file name next to the button */}
      <span className={styles.fileName}>{fileName}</span>
    </div>
  );
};

export default FileInput;
