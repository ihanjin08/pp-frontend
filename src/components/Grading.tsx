import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface GradingProps {
  file: File | null;
}

interface GradingResponse {
  feedback: string[];
  final: string;
}

const Grading: React.FC<GradingProps> = ({ file }) => {
  const [response, setResponse] = useState<GradingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);

  // Test API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        const result = await axios.get('/api/');
        setApiStatus(`API Status: ${result.data.message || 'Connected'}`);
      } catch (err) {
        setApiStatus('API Status: Failed to connect to the API.');
      }
    };

    testApiConnection();
  }, []);

  // Handle file grading
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        if (content) {
          const requestData = {
            subject: 'Language and Literature',
            criterion: 'D',
            content,
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
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <div>
      <p>{apiStatus || 'Checking API connection...'}</p>
      {!file && <p>Please select a file to grade.</p>}
      {file && (
        <>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {response && (
            <div>
              <h2>Feedback:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Grading;