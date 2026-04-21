export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Move/{{gameId}}?playerId={{guestId}}&word=jord'
};

export function postResponse() {
    pm.test('Duplicate word returns 400', () => pm.response.to.have.status(400));
}
