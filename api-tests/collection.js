import createGame from './requests/create-game.js';
import getGame from './requests/get-game.js';
import startGame from './requests/start-game.js';

export const name = 'FromScratchAPI';

export function preRequest() {
    pm.variables.set('baseUrl', 'http://localhost:5001');
}

export const order = [
    createGame,
    getGame,
    startGame
];