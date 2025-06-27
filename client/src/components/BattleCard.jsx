import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function BattleCard({ battle, user, memes }) {
  const isLoggedIn = !!user;
  const navigate = useNavigate(); // Initialize useNavigate

  // Helper: Get full meme data from meme ID
  const getMemeById = (id) => memes?.find((m) => m.id === id);

  const handleVote = () => {
    if (isLoggedIn) {
      const options = battle.entries.map(entry => {
        const meme = getMemeById(entry.meme_id);
        return { meme_id: entry.meme_id, title: meme ? meme.title : "Unknown Meme" }; // Include title
      });
      navigate('/vote', { state: { battleId: battle.id, options } }); // Navigate to VoteForm
    } else {
      alert('You must be logged in to vote.');
    }
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
                  <p style={{ fontWeight: 'bold' }}>Votes: {entry.votes || 0}</p> {/* Display the number of votes */}
                </>
              ) : (
                <p>Image not found</p>
              )}
            </div>
          );
        })}
      </div>

      {isLoggedIn ? (
        <button
          onClick={handleVote}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Vote
        </button>
      ) : (
        <p style={{ fontStyle: 'italic', color: 'gray', marginTop: '1rem' }}>
          Log in to vote in this battle.
        </p>
      )}
    </div>
  );
}

export default BattleCard;
