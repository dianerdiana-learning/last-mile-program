import { useState, useEffect } from 'react';
import DataList from './components/DataList';
import Loader from './components/Loader';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error: ' + response.status);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>User Directory</h1>
      <p className="subtitle">Data from JSONPlaceholder API</p>

      {loading && <Loader />}

      {!loading && error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && data.length > 0 && <DataList data={data} />}

      {!loading && !error && data.length === 0 && (
        <p className="empty-message">No users found.</p>
      )}
    </div>
  );
}

export default App;
