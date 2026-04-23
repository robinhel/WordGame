import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/startPage.scss';


export default function StartPage() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);
  const navigate = useNavigate();

  const createGame = async () => {

    try {
      const response = await fetch('/api/create', { method: 'POST' });
      const data = await response.json();

      await fetch(`/api/Join/${data.id}?name=${username}`, { method: 'POST' });

      navigate(`/create-game/${data.id}`, { state: { username: username } });
    }
    catch (error) {
      console.error("Kunde inte skapa spel", error);
    }
  };

  const joinGame = async () => {

    setError(null);
    if (roomCode.length !== 6) {
      setError("Rumskoden måste vara exakt 6 tecken.");
      return;
    }

    try {
      const response = await fetch(`/api/Join/${roomCode.toUpperCase()}?name=${username}`, {
        method: 'POST'
      });

      if (response.ok) {
        navigate(`/join-game/${roomCode.toUpperCase()}`, { state: { username: username } });
      } else {
        setError('Hittade inget spel med den angivna koden.');
      }
    }
    catch {
      setError('Kunde inte ansluta till servern.');
    }
  };


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

            {error && <p className="error-message">{error}</p>}

            <div className="gamebuttons">
              <button onClick={joinGame} disabled={roomCode.length < 6}>
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
