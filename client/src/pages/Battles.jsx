// Battles.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BattleCard from '../components/BattleCard';

function Battles({ user }) {
  const [battles, setBattles] = useState([]);
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const battlesResponse = await fetch('/battles');
        if (!battlesResponse.ok) throw new Error('Failed to fetch battles');
        const battlesData = await battlesResponse.json();
        setBattles(battlesData);

        const memesResponse = await fetch('/memes');
        if (!memesResponse.ok) throw new Error('Failed to fetch memes');
        const memesData = await memesResponse.json();
        setMemes(memesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleStartBattle = () => {
    if (user) {
      navigate('/startbattle'); // Navigate to StartBattleForm
    } else {
      alert('Please log in to start a battle.'); // Alert if user is not logged in
    }
  };

  return (
    <div>
      <h2>Ongoing Battles</h2>

      <button onClick={handleStartBattle} style={{ margin: '10px 0' }}>
        Start Battle
      </button>

      {!user && <p><i>Log in to participate in battles</i></p>}

      {battles.length === 0 ? (
        <p>No ongoing battles at the moment.</p> // Message for no battles
      ) : (
        battles.map(b => (
          <BattleCard key={b.id} battle={b} user={user} memes={memes} navigate={navigate} />
        ))
      )}
    </div>
  );
}

export default Battles;
