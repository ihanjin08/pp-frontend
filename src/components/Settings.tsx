import styles from './Settings.module.css';

interface SettingsProps {
  settings: {
    subject: string;
    criterion: string;
  };
  onSettingsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCriterionSelect: (criterion: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange, onCriterionSelect }) => {
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
        <div>
          <label>Criterion</label>
          <div className={styles.buttonGroup}>
            {['A', 'B', 'C', 'D'].map((criterion) => (
              <button
                key={criterion}
                onClick={() => onCriterionSelect(criterion)}
                className={settings.criterion === criterion ? styles.selectedButton : ''}
              >
                {criterion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
