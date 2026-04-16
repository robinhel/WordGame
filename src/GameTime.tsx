import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import '../sass/gameTime.scss'


const GameTime = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [endGame, setEndGame] = useState(false)

  const handleQuitClick = () => setEndGame(true)
  const handleCancel = () => setEndGame(false)

  const handleConfirmQuit = () => {
    navigate('/')
  }

  const { player1, player2 } = location.state || {player1: 'okänd', player2: 'okänd' }

return (
  <div className="container">
    <h1 className ="time">G A M E - T I M E </h1>
    <div className="display">
      <p>Välkommen: <strong>{player1}</strong> </p>
      <p>Du möter: <strong>{player2}</strong> </p>
    </div>

    <div className="gameTime">
      <h4>Väntar på första ordet .. </h4>
      <input
        className="word-input"
        type="text"
        placeholder="Skriv ditt ord.." />
      <button className="send-word">Bekräfta ordet</button>
    </div>
    <button onClick={handleQuitClick} className="quit" >Avsluta spel</button>
    {endGame && (
      <div className="endGame">
        <h3>Vill du verkligen avsluta spelet?</h3>
        <button onClick = {handleConfirmQuit}> Ja </button>
        <button onClick = {handleCancel}> Nej </button>
      </div>   
    )}
    </div>
)
}

GameTime.route = {
  path: '/game-Time',
};

export default GameTime;