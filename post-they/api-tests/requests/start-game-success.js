export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Start/{{gameId}}?word=hej'
};

export function postResponse() {
    pm.test('Start game succeeds with two players', () => pm.response.to.have.status(200));
}
