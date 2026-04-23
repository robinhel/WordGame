export default {
    method: 'GET',
    url: '{{baseUrl}}/api/game/{{gameId}}'
};

export function postResponse() {
    pm.test('Status code is 200', () => pm.response.to.have.status(200));

    const json = pm.response.json();

    pm.test('New game starts at round 1', () =>
        pm.expect(json.currentRound).to.equal(1)
    );

    pm.test('New game is not started', () =>
        pm.expect(json.isStarted).to.equal(false)
    );
}
