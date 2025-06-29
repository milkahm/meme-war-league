import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Battles from './pages/Battles';
import Memes from './pages/Memes';
import NewMemeForm from './pages/NewMemeForm';
import StartBattleForm from './pages/StartBattleForm';
import VoteForm from './pages/VoteForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/auth/check_session', {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleVoteSubmit = async (voteData) => {
    try {
      const response = await fetch('http://localhost:5000/votes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          battle_id: parseInt(voteData.battle_id),
          chosen_meme_id: parseInt(voteData.chosen_meme_id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit vote');
      }

      alert('Vote submitted successfully!');
    } catch (error) {
      console.error('Error submitting vote:', error.message);
      alert('There was an error submitting your vote. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/battles" element={<Battles user={user} />} />
        <Route path="/memes" element={<Memes user={user} />} />
        <Route path="/newmeme" element={<NewMemeForm />} />
        <Route path="/startbattle" element={<StartBattleForm />} />
        <Route path="/vote" element={<VoteForm onSubmit={handleVoteSubmit} />} />
      </Routes>
    </div>
  );
}

export default App;
