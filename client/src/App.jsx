// App.jsx or the component where VoteForm is used
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  const [user, setUser ] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/auth/check_session', {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(data => setUser (data))
      .catch(() => setUser (null));
  }, []);

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
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/battles" element={<Battles user={user} />} />
        <Route path="/memes" element={<Memes user={user} />} />
        <Route 
          path="/newmeme" 
          element={user ? <NewMemeForm /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/startbattle" 
          element={user ? <StartBattleForm user={user} /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/vote" 
          element={user ? <VoteForm onSubmit={handleVoteSubmit} userId={user.id} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;
