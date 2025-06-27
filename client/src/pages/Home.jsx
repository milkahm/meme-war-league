// src/pages/Home.jsx
import React from "react";
import "./styles.css"; // Ensure this matches your CSS file name

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title animate-descend">Welcome to Meme War League!</h1>
            <p className="home-description">
                Get ready to laugh your socks off with the funniest memes on the internet!
            </p>
            <div className="meme-gallery">
                <img src="https://i.imgflip.com/1ur9b0.jpg" alt="Meme 1" className="meme-image" />
                <img src="https://i.imgflip.com/30b1gx.jpg" alt="Meme 2" className="meme-image" />
                <img src="https://i.imgflip.com/1g8my4.jpg" alt="Meme 3" className="meme-image" />
            </div>
            <button className="meme-button" onClick={() => alert('You clicked the meme button!')}>
                Show Me More Memes!
            </button>
        </div>
    );
};

export default Home;
