import '../sass/createGamePage.scss';
import * as signalR from "@microsoft/signalr";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Lobby({ isHost }: { isHost: boolean; }) {

  const { gameCode } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const username = location.state?.username || 'Anonym spelare';
  interface Player {
    id: string
    name: string
  }

  interface Game {
    id: string
    currentRound: number
    players: Array<Player | null>
  }
  //const [players, setPlayers] = useState<Player[]>([]);

  const [game, setGame] = useState<Game | null>(null)

  const gameTime = async () => {
    const startWord = "lastbil";
    await fetch(`/api/Start/${gameCode}?word=${startWord}`, { method: 'POST' }); // NY
  };


  const getGameStatus = async () => {
    try {
      const response = await fetch(`/api/game/${gameCode}`);
      if (response.ok) {
        const gameData = await response.json();
        setGame(gameData)
      } else {
        console.error("Spelet existerar inte");
      }
    } catch (error) {
      console.error("Fel vid hämtningen av spelstatus.");
    }
  };


  useEffect(() => {
    getGameStatus();
  }, [gameCode]);


  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/gamehub")
      .build();

    connection.start().then(() => {
      connection.invoke("JoinRoom", gameCode);
    }).catch(err => {
      console.error("Fel vid anslutning till SignalR: ", err);
    });

    connection.on("PlayerJoined", () => {
      getGameStatus();
    });

    connection.on("GameStarted", () => {
      navigate(`/game/${gameCode}`, { state: { username: username } });
    }) // NY

    return () => { connection.stop(); };
  }, [gameCode]);


  const player1 = game?.players?.[0] ?? null
  const player2 = game?.players?.[1] ?? null
  console.log(player1);
  console.log(player2);

  return (
    <>
      <div className='createGame'>
        <h1 className="title">WordGame</h1>
        <h4 className="room-code">RUMSKOD:  {gameCode}</h4>
        <h3 id="welcomeText">Välkommen {username}</h3>

        <p>Du är: {isHost ? 'Värd' : 'Gäst'} </p>
        <div className="currentPlayers">
          <p>Spelare 1: {player1?.name ?? 'Väntar på spelare...'}</p>
          <p>Spelare 2: {player2?.name ?? 'Väntar på spelare...'}</p>
        </div>
        {isHost && (
          <button onClick={gameTime} disabled={!player1 || !player2 } className="startButton">STARTA MATCH</button>
        )}

        {!isHost && (
          <p className='waiting-message'>Väntar på att värden ska starta matchen...</p>
        )}
      </div>
    </>
  );
}