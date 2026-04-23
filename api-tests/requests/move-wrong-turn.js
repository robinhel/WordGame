export default {
    method: 'POST',
    url: '{{baseUrl}}/api/Move/{{gameId}}?playerId={{hostId}}&word=drake'
};

export function postResponse() {
    pm.test('Wrong turn returns 400', () => pm.response.to.have.status(400));
}
