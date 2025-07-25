import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/memes">Memes</Link> |
      <Link to="/battles">Battles</Link> |
      <Link to="/login">Login</Link> |
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default NavBar;
