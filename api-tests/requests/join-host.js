export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Join/{{gameId}}?name=Host'
};

export function postResponse() {
    pm.test('Host can join game', () => pm.response.to.have.status(200));
}
