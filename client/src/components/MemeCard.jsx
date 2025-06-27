import React, { useState } from 'react';

function MemeCard({ meme, onDelete, onUpdate, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(meme.title);
  const [imageUrl, setImageUrl] = useState(meme.image_url);
  const [loading, setLoading] = useState(false);

  const isOwner = user && user.id === meme.user_id;

  const handleDelete = () => {
    fetch(`http://localhost:5000/memes/${meme.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          onDelete(meme.id);
        } else {
          alert('Failed to delete meme');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error deleting meme');
      });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:5000/memes/${meme.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        image_url: imageUrl,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update');
        return res.json();
      })
      .then((updatedMeme) => {
        onUpdate(updatedMeme);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to save changes');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="meme-card" style={{ marginBottom: '1.5rem', border: '1px solid #ddd', padding: '1rem' }}>
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleEditToggle} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{meme.title}</h3>
          <img
            src={meme.image_url}
            alt={meme.title}
            style={{ width: '200px', height: 'auto' }}
          />
          {isOwner && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleEditToggle} style={{ marginRight: '8px' }}>
                Edit
              </button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MemeCard;
