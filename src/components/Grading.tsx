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

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        if (content) {
          const requestData = {
            subject: "Language and Literature",
            criterion: "D",
            content,
            chunk_size: 250,
            chunk_overlap: 50,
          };

          try {
            setLoading(true);
            setError(null);

            const result = await axios.post<GradingResponse>(
              'http://192.168.219.115:8000/grade',
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

  if (!file) {
    return <p>Please select a file to grade.</p>;
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Feedback:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Grading;