import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Game {
    id: string;
    currentRound: number;
    players: string;
}

export default function GamePage() {
    const { gameId } = useParams()
    const [game, setGame] = useState<Game | null>(null)
    const [word, setWord] = useState('')


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

    // if (!game) return <h1>Laddar...</h1>

    return <>
        <h1>WordGame</h1>

        <input type="text" name="" id="" />





        <p>Lobby: {game?.id}</p>
        <p>Runda: {game?.currentRound}</p>
        <p>spelare: {game?.players}</p>
    </>
}