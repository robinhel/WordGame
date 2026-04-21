export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Join/{{gameId}}?name=Guest'
};

export function postResponse() {
    pm.test('Guest can join game', () => pm.response.to.have.status(200));
}
