import { useEffect, useState } from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [formData, setFormData] = useState({ name: '', course: '' });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE}/students`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save student');
      }

      setMessage('Student saved successfully');
      setFormData({ name: '', course: '' });
      await fetchStudents();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app'>
      <h1>Student Registration</h1>

      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          placeholder='Enter student name'
          required
        />

        <label htmlFor='course'>Course</label>
        <input
          id='course'
          name='course'
          type='text'
          value={formData.course}
          onChange={handleChange}
          placeholder='Enter course name'
          required
        />

        <button type='submit' disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>

      {message && <p className='message'>{message}</p>}

      <section className='list-section'>
        <h2>Student List</h2>
        {students.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          <ul className='student-list'>
            {students.map((student) => (
              <li key={student._id}>
                <strong>{student.name}</strong> - {student.course}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
