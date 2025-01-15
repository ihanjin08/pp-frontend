import React from 'react';
import styles from './Settings.module.css';

interface SettingsProps {
  settings: {
    subject: string;
    criterion: string;
  };
  onSettingsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className={styles.settingsBar}>
      <div className={styles.settingsOptions}>
        <label>
          Subject
          <select 
            name="subject" 
            value={settings.subject} 
            onChange={onSettingsChange}
          >
            <option value="Language and Literature">Language and Literature</option>
            <option value="Mathematics">Math</option>
            <option value="Sciences">Science</option>
            <option value="Individuals and Societies">Individuals and Societies</option>
            <option value="Design">Design</option>
          </select>
        </label>
        <label>
          Criterion
          <select 
            name="criterion" 
            value={settings.criterion} 
            onChange={onSettingsChange}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Settings;