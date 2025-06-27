import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MemeCard from '../components/MemeCard';

function Memes({ user }) {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch('/memes')
      .then(res => res.json())
      .then(setMemes);
  }, []);

  const handleDelete = (id) => {
    setMemes(prevMemes => prevMemes.filter(meme => meme.id !== id));
  };

  const handleUpdate = (updatedMeme) => {
    setMemes(prev =>
      prev.map(meme => (meme.id === updatedMeme.id ? updatedMeme : meme))
    );
  };

  return (
    <div>
      <h2>All Memes</h2>

      {user ? (
        <Link to="/newmeme">
          <button style={{ marginBottom: '1rem' }}>Add New Meme</button>
        </Link>
      ) : (
        <p><i>Login to submit a meme</i></p>
      )}

      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          meme={meme}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          user={user}  // ✅ PASS USER HERE
        />
      ))}
    </div>
  );
}

export default Memes;
