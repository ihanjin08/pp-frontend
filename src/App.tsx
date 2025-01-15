// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileInput from './components/FileInput';
import Grading from './components/Grading';
import Settings from './components/Settings';
import NavBar from './components/NavBar';  // Import NavBar
import styles from './App.module.css';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [settings, setSettings] = useState({
    subject: 'Language and Literature',
    criterion: 'A',
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
    <Router>
      <div className={styles.appContainer}>
        {}
        <NavBar />
        <div className={styles.content}>
          {}
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Settings settings={settings} onSettingsChange={handleSettingsChange} />
                  <FileInput multiple={false} onFilesSelected={handleFiles} />
                  <Grading file={selectedFile} settings={settings} />
                </>
              } 
            />
            <Route 
              path="/how-to-use" 
              element={<h1>How to Use Page</h1>} 
            />
          </Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;
