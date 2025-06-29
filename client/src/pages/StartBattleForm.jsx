import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StartBattleForm() {
  const [title, setTitle] = useState('');
  const [selectedMemes, setSelectedMemes] = useState([]);
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('/memes');
        if (!response.ok) throw new Error('Failed to fetch memes');
        const data = await response.json();
        setMemes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const toggleMeme = (memeId) => {
    setSelectedMemes((prev) =>
      prev.includes(memeId) ? prev.filter(id => id !== memeId) : [...prev, memeId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entries = selectedMemes.map((id, i) => ({
      meme_id: id,
      position: i + 1
    }));

    try {
      const response = await fetch('/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, entries }),
      });

      if (!response.ok) throw new Error('Failed to start battle');
      alert('Battle started!');
      navigate('/battles');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p>Loading memes...</p>; // Loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Error handling
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Start New Battle</h3>
      <label>Title:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginBottom: '1rem', display: 'block' }}
      />

      <h4>Select Memes to Include:</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {memes.map((m) => (
          <label
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: selectedMemes.includes(m.id) ? '2px solid green' : '1px solid #ccc',
              padding: '0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '150px'
            }}
          >
            <input
              type="checkbox"
              checked={selectedMemes.includes(m.id)}
              onChange={() => toggleMeme(m.id)}
              style={{ marginBottom: '0.5rem' }}
            />
            <img
              src={m.image_url}
              alt={m.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                marginBottom: '0.5rem'
              }}
            />
            <span>{m.title}</span>
          </label>
        ))}
      </div>

      <button type="submit" disabled={selectedMemes.length < 2} style={{ marginTop: '1rem' }}>
        Start Battle
      </button>
      {selectedMemes.length < 2 && <p style={{ color: 'red' }}>Please select at least 2 memes.</p>} {/* Validation feedback */}
    </form>
  );
}

export default StartBattleForm;
