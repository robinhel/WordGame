import createGame from './requests/create-game.js';
import getGame from './requests/get-game.js';
import startGameTooFewPlayers from './requests/start-game.js';
import joinHost from './requests/join-host.js';
import joinGuest from './requests/join-guest.js';
import capturePlayers from './requests/capture-players.js';
import startGameSuccess from './requests/start-game-success.js';
import getGameAfterStart from './requests/get-game-after-start.js';
import moveValid from './requests/move-valid.js';
import moveWrongTurn from './requests/move-wrong-turn.js';
import moveDuplicate from './requests/move-duplicate.js';

export const name = 'FromScratchAPI';

export function preRequest() {
    pm.variables.set('baseUrl', 'http://localhost:5001');
}

export const order = [
    createGame,
    getGame,
    startGameTooFewPlayers,
    joinHost,
    joinGuest,
    capturePlayers,
    startGameSuccess,
    getGameAfterStart,
    moveValid,
    moveWrongTurn,
    moveDuplicate
];
