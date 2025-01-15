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
  feedback: string[];
  final: string;
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
    setSelectedParts((prev) => {
      if (prev.includes(text)) {
        return prev.filter((part) => part !== text);
      } else {
        return [...prev, text];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedParts.length > 0) {
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

        const result = await axios.post<GradingResponse>(
          '/api/grade',
          requestData
        );

        setResponse(result.data);
      } catch (err) {
        setError('Failed to grade content. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please select at least one part of the content to submit.');
    }
  };

  return (
    <div className={styles.container}>
      {content && (
        <div>
          <div className={styles.markdownPreview}>
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
      )}
      {error && <p className={styles.error}>{error}</p>}
      {response && (
        <div className={styles.feedback}>
          <h2>Feedback:</h2>
          {response.feedback.length > 0 ? (
            <div>
              {response.feedback.map((feedbackItem, index) => (
                <div key={index} className={styles.feedbackItem}>
                  <p><strong>Strand {index + 1}:</strong></p>
                  <ReactMarkdown>{feedbackItem}</ReactMarkdown>
                </div>
              ))}
            </div>
          ) : (
            <p>No feedback available.</p>
          )}
          <h3>Final Grade:</h3>
          <p>{response.final}</p>
        </div>
      )}
    </div>
  );
};

export default Grading;