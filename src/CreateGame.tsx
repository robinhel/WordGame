import '../sass/createGamePage.scss';
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


CreateGame.route = {
  path: '/create-game',
  index: 2
};

export default function CreateGame() {

  const location = useLocation();
  const navigate = useNavigate()
  const username = location.state?.username || 'Anonym spelare';

  const gameTime = () => {
    navigate('/Game-Time')
    }
  
   

    return (
    <>
      <div className='createGame'>
        <h1 className="title">WordGame</h1>
        <h3 id="welcomeText">Välkommen {username}</h3>
        <div className="gamebuttons">
        </div>
        <div className="currentPlayers">
            <p>Player 1 {username} - Status : Joined </p>
            <p>Player 2 - Status : Waiting</p>
        </div>
          <button onClick={gameTime} className="startButton">
            STARTA MATCH
        </button>
      </div>
    </>
  );
}