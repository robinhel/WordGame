export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Move/{{gameId}}?playerId={{hostId}}&word=jord'
};

export function postResponse() {
    pm.test('Valid move returns 200', () => pm.response.to.have.status(200));
}
