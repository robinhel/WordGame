using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace App.Tests;

public class ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task CreateGame_ShouldReturnGameIdAndUrl()
    {
        var response = await _client.PostAsync("/api/create", null);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var body = await response.Content.ReadFromJsonAsync<CreateGameResponse>();
        Assert.NotNull(body);
        Assert.NotNull(body!.Id);
        Assert.Equal(6, body.Id.Length);
        Assert.Equal($"/game/{body.Id}", body.Url);
    }

    [Fact]
    public async Task GetGame_ShouldReturnCreatedGame()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        var gameResponse = await _client.GetAsync($"/api/game/{createBody!.Id}");
        Assert.Equal(HttpStatusCode.OK, gameResponse.StatusCode);

        var gameBody = await gameResponse.Content.ReadFromJsonAsync<GameDto>();
        Assert.NotNull(gameBody);
        Assert.Equal(createBody.Id, gameBody!.Id);
        Assert.Equal(1, gameBody!.CurrentRound);
        Assert.False(gameBody.IsStarted);
    }

    [Fact]
    public async Task GetGame_ShouldReturnNotFound_WhenGameDoesNotExist()
    {
        var response = await _client.GetAsync("/api/game/NOPE99");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task StartGame_ShouldReturnBadRequest_WhenGameHasTooFewPlayers()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        var startResponse = await _client.PostAsync($"/api/Start/{createBody!.Id}?word=HeJ", null);
        Assert.Equal(HttpStatusCode.BadRequest, startResponse.StatusCode);

        var gameResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameBody = await gameResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBody);
        Assert.False(gameBody!.IsStarted);
        Assert.Empty(gameBody.UsedWords);
    }

    [Fact]
    public async Task StartGame_ShouldReturnBadRequest_WhenGameDoesNotExist()
    {
        var response = await _client.PostAsync("/api/Start/NOPE99?word=test", null);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task JoinGame_ShouldReturnOk_AndAddPlayer()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        var joinResponse = await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);

        Assert.Equal(HttpStatusCode.OK, joinResponse.StatusCode);

        var gameResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var game = await gameResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(game);
        Assert.Single(game!.Players);
        Assert.Equal("Anna", game.Players[0].Name);
    }

    [Fact]
    public async Task JoinGame_ShouldReturnBadRequest_WhenGameDoesNotExist()
    {
        var joinResponse = await _client.PostAsync("/api/Join/NOPE99?name=Anna", null);

        Assert.Equal(HttpStatusCode.BadRequest, joinResponse.StatusCode);
    }

    [Fact]
    public async Task StartGame_ShouldReturnOk_AndInitializeState_WhenTwoPlayersJoined()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);

        var startResponse = await _client.PostAsync($"/api/Start/{createBody.Id}?word=HeJ", null);

        Assert.Equal(HttpStatusCode.OK, startResponse.StatusCode);

        var gameResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var game = await gameResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(game);
        Assert.True(game!.IsStarted);
        Assert.Equal("hej", game.CurrentWord);
        Assert.Contains("hej", game.UsedWords);
        Assert.Equal(0, game.CurrentTurnIndex);
    }

    [Fact]
    public async Task StartGame_ShouldReturnBadRequest_WhenAlreadyStarted()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);

        var firstStart = await _client.PostAsync($"/api/Start/{createBody.Id}?word=hej", null);
        var secondStart = await _client.PostAsync($"/api/Start/{createBody.Id}?word=jord", null);

        Assert.Equal(HttpStatusCode.OK, firstStart.StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, secondStart.StatusCode);
    }

    [Fact]
    public async Task MakeMove_ShouldReturnBadRequest_WhenGameNotStarted()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);

        var gameResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var game = await gameResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(game);

        var moveResponse = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={game!.Players[0].Id}&word=jord", null);

        Assert.Equal(HttpStatusCode.BadRequest, moveResponse.StatusCode);
    }

    [Fact]
    public async Task MakeMove_ShouldReturnOk_WhenMoveIsValid()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        var joinHostResponse = await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        var joinGuestResponse = await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);

        Assert.Equal(HttpStatusCode.OK, joinHostResponse.StatusCode);
        Assert.Equal(HttpStatusCode.OK, joinGuestResponse.StatusCode);

        var gameBeforeStartResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameBeforeStart = await gameBeforeStartResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBeforeStart);
        Assert.Equal(2, gameBeforeStart!.Players.Count);

        var firstPlayerId = gameBeforeStart.Players[0].Id;

        var startResponse = await _client.PostAsync($"/api/Start/{createBody.Id}?word=hej", null);
        Assert.Equal(HttpStatusCode.OK, startResponse.StatusCode);

        var moveResponse = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={firstPlayerId}&word=jord", null);
        Assert.Equal(HttpStatusCode.OK, moveResponse.StatusCode);

        var gameAfterMoveResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameAfterMove = await gameAfterMoveResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameAfterMove);
        Assert.Equal("jord", gameAfterMove!.CurrentWord);
        Assert.Contains("hej", gameAfterMove.UsedWords);
        Assert.Contains("jord", gameAfterMove.UsedWords);
        Assert.Equal(1, gameAfterMove.CurrentTurnIndex);
    }

    [Fact]
    public async Task MakeMove_ShouldReturnBadRequest_WhenWrongPlayerTriesToMove()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);

        var gameBeforeStartResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameBeforeStart = await gameBeforeStartResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBeforeStart);
        Assert.Equal(2, gameBeforeStart!.Players.Count);

        var secondPlayerId = gameBeforeStart.Players[1].Id;

        var startResponse = await _client.PostAsync($"/api/Start/{createBody.Id}?word=hej", null);
        Assert.Equal(HttpStatusCode.OK, startResponse.StatusCode);

        var moveResponse = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={secondPlayerId}&word=jord", null);
        Assert.Equal(HttpStatusCode.BadRequest, moveResponse.StatusCode);
    }

    [Fact]
    public async Task MakeMove_ShouldReturnBadRequest_WhenWordStartsWithWrongLetter()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);
        await _client.PostAsync($"/api/Start/{createBody.Id}?word=hej", null);

        var gameBeforeMoveResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameBeforeMove = await gameBeforeMoveResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBeforeMove);

        var currentPlayerId = gameBeforeMove!.Players[0].Id;
        var moveResponse = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={currentPlayerId}&word=apa", null);

        Assert.Equal(HttpStatusCode.BadRequest, moveResponse.StatusCode);
    }

    [Fact]
    public async Task MakeMove_ShouldReturnBadRequest_WhenWordAlreadyUsed()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);
        await _client.PostAsync($"/api/Start/{createBody.Id}?word=hej", null);

        var gameBeforeMovesResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameBeforeMoves = await gameBeforeMovesResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBeforeMoves);

        var firstPlayerId = gameBeforeMoves!.Players[0].Id;
        var secondPlayerId = gameBeforeMoves.Players[1].Id;

        var firstMove = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={firstPlayerId}&word=jord", null);
        var duplicateMove = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={secondPlayerId}&word=jord", null);

        Assert.Equal(HttpStatusCode.OK, firstMove.StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, duplicateMove.StatusCode);
    }

    [Fact]
    public async Task MakeMove_ShouldIncreaseRound_WhenTurnCyclesBackToPlayerOne()
    {
        var createResponse = await _client.PostAsync("/api/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        await _client.PostAsync($"/api/Join/{createBody!.Id}?name=Anna", null);
        await _client.PostAsync($"/api/Join/{createBody.Id}?name=Bosse", null);
        await _client.PostAsync($"/api/Start/{createBody.Id}?word=hej", null);

        var gameBeforeMovesResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameBeforeMoves = await gameBeforeMovesResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBeforeMoves);

        var firstPlayerId = gameBeforeMoves!.Players[0].Id;
        var secondPlayerId = gameBeforeMoves.Players[1].Id;

        var move1 = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={firstPlayerId}&word=jord", null);
        var move2 = await _client.PostAsync($"/api/Move/{createBody.Id}?playerId={secondPlayerId}&word=dal", null);

        Assert.Equal(HttpStatusCode.OK, move1.StatusCode);
        Assert.Equal(HttpStatusCode.OK, move2.StatusCode);

        var gameAfterMovesResponse = await _client.GetAsync($"/api/game/{createBody.Id}");
        var gameAfterMoves = await gameAfterMovesResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameAfterMoves);
        Assert.Equal(2, gameAfterMoves!.CurrentRound);
        Assert.Equal(0, gameAfterMoves.CurrentTurnIndex);
    }

    private sealed class CreateGameResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    private sealed class GameDto
    {
        public string Id { get; set; } = string.Empty;
        public int CurrentRound { get; set; }
        public bool IsStarted { get; set; }
        public string CurrentWord { get; set; } = string.Empty;
        public List<string> UsedWords { get; set; } = new();
        public int CurrentTurnIndex { get; set; }
        public List<PlayerDto> Players { get; set; } = new();
    }

    private sealed class PlayerDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }
}
