import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../sass/startPage.scss'


export default function StartPage() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);
  const navigate = useNavigate();

  const createGame = () => {

    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    navigate(`/create-game/${randomCode}`, {state: {username : username}})
  }

  const joinGame = () => {
    if (roomCode.length >= 4)
    {
      navigate(`/join-game/${roomCode.toUpperCase()}`, {state: {username : username}})
    }
  }


  useEffect(() => {
    (async () => {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage((data as any).message);
    })();
  }, []);

  return (
    <>
      <div className='startpage'>

        <h1 className="title">WordGame</h1>
        {!showJoinInput && (
          <>
        <input
          className="username"
          type="text"
          placeholder="Skriv in ditt namn..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="gamebuttons">
          <button onClick={createGame}
            disabled={username.length < 2}>
            SKAPA SPEL</button>
          <button onClick={() => setShowJoinInput(true)}
            disabled={username.length < 2}>
            GÅ MED I SPEL
          </button>
        </div>   
          </>
        )}

        {showJoinInput && (
          <>
          <input
          className='roomcode-input'
          type='text'
          placeholder='Ange rumskod...'
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          />
          <div className="gamebuttons">
            <button onClick={joinGame} disabled={roomCode.length < 4}>
            ANSLUT NU
            </button>
            <button onClick={() => setShowJoinInput(false)}>
              GÅ TILLBAKA
            </button>
          </div>
          </>
        )}
      </div>
    </>
  );
}
