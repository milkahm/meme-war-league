import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function BattleCard({ battle, memes }) {
  const navigate = useNavigate(); // Initialize useNavigate

  // Helper: Get full meme data from meme ID
  const getMemeById = (id) => memes?.find((m) => m.id === id);

  const handleVote = () => {
    const options = battle.entries.map(entry => {
      const meme = getMemeById(entry.meme_id);
      return { meme_id: entry.meme_id, title: meme ? meme.title : "Unknown Meme" }; // Include title
    });
    navigate('/vote', { state: { battleId: battle.id, options } }); // Navigate to VoteForm
  };

  return (
    <div className="battle-card" style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
      <h2>{battle.title}</h2>
      <p>Entries: {battle.entries?.length || 0}</p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {battle.entries?.map((entry) => {
          const meme = getMemeById(entry.meme_id);
          return (
            <div key={entry.meme_id} style={{ textAlign: 'center', maxWidth: '150px' }}>
              {meme ? (
                <>
                  <img
                    src={meme.image_url}
                    alt={meme.title}
                    style={{ width: '100%', borderRadius: '6px' }}
                  />
                  <p style={{ marginTop: '0.5rem' }}>{meme.title}</p>
                </>
              ) : (
                <p>Image not found</p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleVote}
        style={{ marginTop: '1rem' }}
      >
        Vote
      </button>
    </div>
  );
}

export default BattleCard;
