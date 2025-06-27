// VoteCard.jsx
import React from 'react';
import VoteForm from './VoteForm';

const VoteCard = ({ user }) => {
  const handleVoteSubmit = async (voteData) => {
    try {
      const response = await fetch('/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(voteData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      alert('Vote submitted successfully!');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('There was an error submitting your vote. Please try again.');
    }
  };

  return (
    <VoteForm onSubmit={handleVoteSubmit} userId={user.id} />
  );
};

export default VoteCard;
