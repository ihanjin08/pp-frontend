import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styles from './Grading.module.css';

interface GradingProps {
  file: File | null;
  settings: {
    subject: string;
    criterion: string;
  };
}

interface GradingResponse {
  feedback: {
    strand: number;
    feedback: string;
  }[];
  final: number;
}

const Grading: React.FC<GradingProps> = ({ file, settings }) => {
  const [content, setContent] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [response, setResponse] = useState<GradingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  }, [file]);

  const handleToggleSelect = (text: string) => {
    setSelectedParts((prev) =>
      prev.includes(text) ? prev.filter((part) => part !== text) : [...prev, text]
    );
  };

  const handleSubmit = async () => {
    if (selectedParts.length === 0) {
      setError('Please select at least one part of the content to submit.');
      return;
    }

    const requestData = {
      subject: settings.subject,
      criterion: settings.criterion,
      content: selectedParts.join('\n\n'),
      chunk_size: 250,
      chunk_overlap: 50,
    };

    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const result = await axios.post<GradingResponse>('/api/grade', requestData);

      setResponse(result.data);
    } catch (err) {
      setError('Failed to grade content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {content ? (
        <>
          <div className={styles.markdownPreview}>
            <h2>Content Preview</h2>
            {content.split('\n\n').map((paragraph, index) => (
              <div
                key={index}
                className={`${styles.paragraph} ${
                  selectedParts.includes(paragraph) ? styles.selectedParagraph : ''
                }`}
                onClick={() => handleToggleSelect(paragraph)}
              >
                <ReactMarkdown>{paragraph}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className={styles.selectionInfo}>
            <p>
              <strong>Selected Parts:</strong>{' '}
              {selectedParts.length > 0
                ? `${selectedParts.length} part(s) selected`
                : 'None'}
            </p>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Selected Text'}
            </button>
          </div>
        </>
      ) : (
        <p className={styles.info}>Upload a file to view its content.</p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {response && (
        <div className={styles.feedbackSection}>
          <h2>Feedback</h2>
          {response.feedback.map((item, index) => (
            <div key={index} className={styles.feedbackItem}>
              <p>
                <strong>Strand {item.strand}:</strong>
              </p>
              <ReactMarkdown>{item.feedback}</ReactMarkdown>
            </div>
          ))}
          <h3>Final Grade</h3>
          <p className={styles.finalGrade}>{response.final}</p>
        </div>
      )}
    </div>
  );
};

export default Grading;