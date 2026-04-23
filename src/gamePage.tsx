import * as signalR from '@microsoft/signalr';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../sass/gamePage.scss';
import { useNavigate } from "react-router-dom";


interface Player {
    id: string;
    name: string;
}
interface Game {
    id: string;
    currentRound: number;
    currentTurnIndex: number;
    players: Player[];
}

export default function GamePage() {
    const { gameId } = useParams();
    const location = useLocation();
    const username = location.state?.username || 'Anonym spelare';
    const [game, setGame] = useState<Game | null>(null);
    const [word, setWord] = useState('');
    const navigate = useNavigate();
    const [endGame, setEndGame] = useState(false);
    const [submittedWords, setSubmittedWords] = useState<{ playerId: string, text: string; }[]>([]);

    const [timeLeft, setTimeLeft] = useState(7);
    const [hp, setHp] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);

    const handleQuitClick = () => setEndGame(true);
    const handleCancel = () => setEndGame(false);

    const handleConfirmQuit = () => {
        navigate('/');
    };


    const currentPlayer = useMemo(() => {
        return game?.players.find(player => player.name === username) ?? null;
    }, [game, username]);

    const isMyTurn = useMemo(() => {
        if (!game || !currentPlayer)
            return false;

        return game.players[game.currentTurnIndex]?.id === currentPlayer.id;
    }, [game, currentPlayer]);

    const getGameStatus = async () => {
        if (!gameId)
            return;

        try {
            const response = await fetch(`/api/game/${gameId}`);
            if (!response.ok)
                throw new Error('Game not found');

            const data = await response.json();
            setGame(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!gameId) return;

        void getGameStatus();
    }, [gameId]);


    useEffect(() => {
        if (!gameId)
            return;

        let isMounted = true;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl('/gamehub')
            .withAutomaticReconnect()
            .build();

        const handleReceiveMove = (playerId: string, newWord: string) => {
            setSubmittedWords(prev => [...prev, { playerId, text: newWord }]);
            void getGameStatus();
        };

        connection.on('ReceiveMove', handleReceiveMove);

        const startConnection = async () => {
            try {
                await connection.start();

                if (!isMounted)
                    return;

                await connection.invoke('JoinRoom', gameId);
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                const isNegotiationAbort =
                    message.includes('stopped during negotiation') ||
                    message.includes('AbortError');

                if (!isMounted && isNegotiationAbort)
                    return;

                console.error('Fel vid anslutning till SignalR: ', err);
            }
        };

        void startConnection();

        return () => {
            isMounted = false;
            connection.off('ReceiveMove', handleReceiveMove);
            void connection.stop();
        };
    }, [gameId]);


    const submitWord = async () => {
        if (!gameId || !currentPlayer || !isMyTurn)
            return;

        if (!word.trim()) return;

        const response = await fetch(`/api/Move/${gameId}?playerId=${currentPlayer.id}&word=${encodeURIComponent(word)}`, {
            method: 'POST'
        });

        if (response.ok) {
            setWord(''); 
            setTimeLeft(7); 
        }

        if (!response.ok) {
            console.error('Ogiltigt ord eller inte din tur.');
            return;
        }

        setWord('');
    };


    useEffect(() => {
        if (isGameOver || !isMyTurn) {
            setTimeLeft(7); 
            return;
        }

        if (timeLeft === 0) {
            if (hp > 1) {
                setHp(prev => prev - 1);
                setTimeLeft(7);
            } else {
                setHp(0);
                setIsGameOver(true);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, hp, isGameOver, isMyTurn]); 


    return <>
        <div className='game'>
            <div className="game-stats" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
                <div className="hp-indicator" style={{ fontSize: '1.5rem' }}>
                    HP: {"❤️".repeat(hp)}
                </div>
                <div className={`timer-display ${timeLeft <= 2 ? "danger" : ""}`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Tid: {timeLeft}s
                </div>
            </div>

            {isGameOver && (
                <div className="endGame" style={{ zIndex: 100 }}>
                    <h3>G A M E - O V E R</h3>
                    <p>Du fick slut på HP!</p>
                </div>
            )}

            {isMyTurn && timeLeft <= 2 && timeLeft > 0 && (
                <div className="alert alert-warning">            
                    <strong>Skynda dig!</strong> Du har bara {timeLeft} sekunder kvar!
                </div>
            )}

            <aside className="sidebar">
                <h2 className="Historik">Historik</h2>
                <div className="history-list">
                    {submittedWords.map((item, index) => {
                        const playerName = game?.players.find(player => player.id === item.playerId)?.name || 'Okänd spelare';
                        return (
                            <p key={index} className="history-item">
                                <strong>{playerName}:</strong> {item.text}
                            </p>
                        );
                    })}
                </div>
            </aside>

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
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        disabled={!isMyTurn || game?.players[0]?.name !== username || isGameOver}
                        placeholder={game?.players[0]?.name === username ? 'Skriv ditt ord...' : 'Väntar på spelare 1...'}
                    />
                </div>
                <div className="word-history">
                    <p>{game?.players[game?.currentTurnIndex ?? 0]?.name} tur</p>
                </div>

                <div className='play2'>
                    <p>{game?.players[1].name}</p>
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        disabled={!isMyTurn || game?.players[1]?.name !== username || isGameOver}
                        placeholder={game?.players[1]?.name === username ? 'Skriv ditt ord...' : 'Väntar på spelare 2...'}
                    />
                </div>
            </div>
            <button className='skicka' onClick={submitWord} disabled={isGameOver}>
                Skicka
            </button>
            <div className="choosenWord">
                {submittedWords.length > 0 ? (
                    <h1>{submittedWords[submittedWords.length - 1].text}</h1>
                ) : (
                    <h1>Väntar på nästa ord.. </h1>
                )}
            </div>
        </div>
    </>;
}