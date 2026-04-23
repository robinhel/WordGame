export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Start/{{gameId}}?word=HeJ'
};

export function postResponse() {
    pm.test('Status code is 400 when too few players', () =>
        pm.response.to.have.status(400)
    );
}
