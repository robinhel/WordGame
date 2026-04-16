import '../sass/createGamePage.scss';
import { useState, useEffect } from 'react'
import { useParams ,useNavigate, useLocation } from 'react-router-dom'

export default function Lobby({ isHost }: { isHost: boolean }) {

        const { gameCode } = useParams();
        const navigate = useNavigate()

        const location = useLocation();

        const username = location.state?.username || 'Anonym spelare';
        const gameTime = () => {
        navigate('/Game-Time')
        }

        useEffect(() => {
          const getGameStatus = async () => {
            try{
              const response = await fetch(`/game/${gameCode}`);
              if (response.ok){
                const gameData = await response.json();
              } else{
                console.error("Spelet existerar inte");
              }
            } catch (error)
            {
              console.error("Fel vid hämtningen av spelstatus.")
            }
          };
          getGameStatus();
        }, [gameCode])

    return (
    <>
      <div className='createGame'>
        <h1 className="title">WordGame</h1>
        <h4 className="room-code">RUMSKOD:  {gameCode}</h4>
        <h3 id="welcomeText">Välkommen {username}</h3>

        <p>Du är: {isHost ? 'Värd' : 'Gäst'} </p>
        <div className="currentPlayers">
          <p>Spelare 1: {isHost ? username : 'Värden'} (Redo)</p>
          <p>Spelare 2: {isHost ? 'Väntar på spelare att ansluta...' : username} ({isHost ? 'Väntar' : 'Redo'})</p>
        </div>
        {isHost && (
        <button onClick={gameTime} className="startButton">STARTA MATCH</button>
        )}

        {!isHost && (
          <p className='waiting-message'>Väntar på att värden ska starta matchen...</p>
        )}
      </div>
    </>
  );
}