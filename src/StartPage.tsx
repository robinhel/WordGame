import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function StartPage() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const createGame = () => {
    navigate('/create-game', {state: {username : username}})
  }

  const joinGame = () => {
    navigate('/join-game', {state: {username : username}})
  }

  // SKRIV TEST TILL DENNA 
  const confirmName = () => {
    if (username.length < 2) {
      alert('Namnet måste vara minst 2 bokstäver')
      return;
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

        <input
          className="username"
          type="text"
          placeholder="Skriv in ditt namn..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={confirmName}> Bekräfta </button>

        <div className="gamebuttons">
          <button onClick={createGame}
            disabled={username.length < 2}>
            SKAPA SPEL</button>
          <button onClick={joinGame}
            disabled={username.length < 2}>
            JOINA SPEL
          </button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
