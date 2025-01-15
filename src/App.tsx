import React, { useState } from 'react';
import FileInput from './components/FileInput';
import Grading from './components/Grading';
import Settings from './components/Settings';
import styles from './App.module.css';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [settings, setSettings] = useState({
    subject: 'Language and Literature',
    criterion: 'D',
  });

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.content}>
        <Settings 
          settings={settings} 
          onSettingsChange={handleSettingsChange} 
        />
        <FileInput multiple={false} onFilesSelected={handleFiles} />
        <Grading file={selectedFile} />
      </div>
    </div>
  );
};

export default App;