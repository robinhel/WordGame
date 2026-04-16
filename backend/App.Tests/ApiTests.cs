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
        var response = await _client.PostAsync("/create", null);

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
        var createResponse = await _client.PostAsync("/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        var gameResponse = await _client.GetAsync($"/game/{createBody!.Id}");
        Assert.Equal(HttpStatusCode.OK, gameResponse.StatusCode);

        var gameBody = await gameResponse.Content.ReadFromJsonAsync<GameDto>();
        Assert.NotNull(gameBody);
        Assert.Equal(1, gameBody!.CurrentRound);
        Assert.False(gameBody.IsStarted);
    }

    [Fact]
    public async Task StartGame_ShouldReturnBadRequest_WhenGameHasTooFewPlayers()
    {
        var createResponse = await _client.PostAsync("/create", null);
        var createBody = await createResponse.Content.ReadFromJsonAsync<CreateGameResponse>();

        Assert.NotNull(createBody);

        var startResponse = await _client.PostAsync($"/Start/{createBody!.Id}?word=HeJ", null);
        Assert.Equal(HttpStatusCode.BadRequest, startResponse.StatusCode);

        var gameResponse = await _client.GetAsync($"/game/{createBody.Id}");
        var gameBody = await gameResponse.Content.ReadFromJsonAsync<GameDto>();

        Assert.NotNull(gameBody);
        Assert.False(gameBody!.IsStarted);
        Assert.Empty(gameBody.UsedWords);
    }

    [Fact]
    public async Task StartGame_ShouldReturnBadRequest_WhenGameDoesNotExist()
    {
        var response = await _client.PostAsync("/Start/NOPE99?word=test", null);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    private sealed class CreateGameResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    private sealed class GameDto
    {
        public int CurrentRound { get; set; }
        public bool IsStarted { get; set; }
        public List<string> UsedWords { get; set; } = new();
    }
}
