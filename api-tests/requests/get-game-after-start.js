export default {
    method: 'GET',
    url: '{{baseUrl}}/api/game/{{gameId}}'
};

export function postResponse() {
    const json = pm.response.json();

    pm.test('Game is started', () => pm.expect(json.isStarted).to.equal(true));

    pm.test('Current word and used words initialized', () => {
        pm.expect(json.currentWord).to.equal('hej');
        pm.expect(json.usedWords).to.include('hej');
    });

    pm.test('Current turn index starts at first player', () => {
        pm.expect(json.currentTurnIndex).to.equal(0);
    });
}
