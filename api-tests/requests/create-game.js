export default {
    method: 'POST',
    url: '{{baseUrl}}/create'
};

export function postResponse() {
    pm.test('Status code is 200', () => pm.response.to.have.status(200));

    const json = pm.response.json();

    pm.test('Response has game id', () => {
        pm.expect(json.id).to.be.a('string');
        pm.expect(json.id.length).to.equal(6);
    });

    pm.test('Response has game url', () =>
        pm.expect(json.url).to.equal(`/game/${json.id}`)
    );

    pm.variables.set('gameId', json.id);
}
