export default {
    method: 'GET',
    url: '{{baseUrl}}/api/game/{{gameId}}'
};

export function postResponse() {
    pm.test('Game has two players after joins', () => {
        const json = pm.response.json();
        pm.expect(json.players).to.be.an('array');
        pm.expect(json.players.length).to.equal(2);

        pm.variables.set('hostId', json.players[0].id);
        pm.variables.set('guestId', json.players[1].id);
    });
}
