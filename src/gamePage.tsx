import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../sass/gamePage.scss';
import { useLocation, useNavigate } from "react-router-dom";


interface Player {
    id: string
    name: string
}
interface Game {
    id: string;
    currentRound: number;
    players: Player[];
}

export default function GamePage() {
    const { gameId } = useParams()
    const [game, setGame] = useState<Game | null>(null)
    const [player1Word, setPlayer1Word] = useState('')
    const [player2Word, setPlayer2Word] = useState('')
    const [activePlayer, setActivePlayer] = useState<1 | 2>(1)
    const navigate = useNavigate()
    const [endGame, setEndGame] = useState(false)

    const handleQuitClick = () => setEndGame(true)
    const handleCancel = () => setEndGame(false)

    const handleConfirmQuit = () => {
        navigate('/')
    }



    useEffect(() => {
        if (!gameId) return

        fetch(`/api/game/${gameId}`)
            .then(res => {
                if (!res.ok) throw new Error('Game not found')
                return res.json()
            })
            .then(data => setGame(data))
            .catch(err => console.error(err))
    }, [gameId])


    const submitWord = () => {
        const word = activePlayer === 1 ? player1Word : player2Word

        if (!word.trim()) return

        console.log(`Player ${activePlayer} skickade:`, word)

        if (activePlayer === 1) {
            setPlayer1Word('')
            setActivePlayer(2)
        } else {
            setPlayer2Word('')
            setActivePlayer(1)
        }
    }

    // if (!game) return <h1>Laddar...</h1>

    return <>
        <div className='game'>
            <button onClick={handleQuitClick} className="quit" >Avsluta spel</button>
            {endGame && (
                <div className="endGame">
                    <h3>Vill du verkligen avsluta spelet?</h3>
                    <button onClick={handleConfirmQuit}> Ja </button>
                    <button onClick={handleCancel}> Nej </button>
                </div>
            )}
            <h1>G A M E - T I M E</h1>


            <p>Lobby: {game?.id}</p>
            <p>Runda: {game?.currentRound}</p>



            <div className='players'>
                <div className='play1'>
                    <p>{game?.players[0].name}</p>
                    <input
                        type="text"
                        value={player1Word}
                        onChange={(e) => setPlayer1Word(e.target.value)}
                        disabled={activePlayer !== 1}
                        placeholder="Player 1 skriver..."
                    />
                </div>

                <div className='play2'>
                    <p>{game?.players[1].name}</p>
                    <input
                        type="text"
                        value={player2Word}
                        onChange={(e) => setPlayer2Word(e.target.value)}
                        disabled={activePlayer !== 2}
                        placeholder="Player 2 skriver..."
                    />
                </div>
            </div>
            <button className='skicka' onClick={submitWord}>
                Skicka
            </button>

        </div>
    </>
}