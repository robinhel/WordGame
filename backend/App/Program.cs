
using Microsoft.AspNetCore.SignalR;
using WordGame.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
var app = builder.Build();

var games = new Dictionary<string, Game>();

Player AddPlayer(string gameId, string name)
{
    if (!games.ContainsKey(gameId))
        throw new Exception("Game not found");

    var game = games[gameId];

    var player = new Player(name);

    game.Players.Add(player);

    return player;
}


Game CreateGame()
{
    var game = new Game();

    games[game.Id] = game;

    return game;
}


bool JoinGame(string gameId, string name)
{
    if (!games.ContainsKey(gameId))
        return false;

    AddPlayer(gameId, name);
    return true;
}



Game? GetGame(string gameId)
{
    if (!games.ContainsKey(gameId))
        return null;

    return games[gameId];
}

bool StartGame(string gameId, string startWord)
{
    if (!games.ContainsKey(gameId))
        return false;

    var game = games[gameId];

    if (game.Players.Count < 2)
        return false;

    if (game.IsStarted)
        return false;

    startWord = startWord.ToLower();

    game.IsStarted = true;
    game.CurrentWord = startWord;
    game.UsedWords.Add(startWord);
    game.CurrentTurnIndex = 0;

    return true;
}

bool MakeMove(string gameId, string playerId, string word)
{
    if (!games.ContainsKey(gameId))
        return false;

    var game = games[gameId];

    if (!game.IsStarted || game.IsFinished)
        return false;

    if (game.Players.Count < 2)
        return false;

    if (string.IsNullOrWhiteSpace(word))
        return false;

    var currentPlayer = game.Players[game.CurrentTurnIndex];

    if (currentPlayer.Id != playerId)
        return false;

    word = word.Trim().ToLowerInvariant();

    if (game.UsedWords.Contains(word))
        return false;

    var expectedStart = game.CurrentWord[^1];

    // New word must begin with last letter of current word.
    if (word[0] != expectedStart)
        return false;

    // Apply move and advance turn.
    game.CurrentWord = word;
    game.UsedWords.Add(word);
    game.CurrentTurnIndex = (game.CurrentTurnIndex + 1) % game.Players.Count;

    // Increase round when turn cycles back to the first player.
    if (game.CurrentTurnIndex == 0)
        game.CurrentRound++;

    return true;
}




// ----------------------------------------------------- Endpoints --------------------------------------------------



app.MapPost("/api/create", () =>
{
    var game = CreateGame();

    return new
    {
        game.Id,
        url = $"/game/{game.Id}"
    };
});

app.MapGet("/api/game/{id}", (string id) =>
{
    var game = GetGame(id);

    return game is null
        ? Results.NotFound()
        : Results.Ok(game);
});

app.MapPost("/api/Start/{id}", (string id, string word) =>
{
    var success = StartGame(id, word);

    return success
        ? Results.Ok()
        : Results.BadRequest();
});

app.MapPost("/api/Join/{id}", async (string id, string name, IHubContext<GameHub> hubContext) =>
{
    var success = JoinGame(id, name);
    // TESTA
    if(success)
    {
        await hubContext.Clients.Group(id).SendAsync("PlayerJoined");
        return Results.Ok();
    }
    // TESTA
    return Results.BadRequest();
});

app.MapPost("/api/Move/{id}", async (string id, string playerId, string word, IHubContext<GameHub> hubContext) =>
{
    var success = MakeMove(id, playerId, word);

    if(success)
    {
        await hubContext.Clients.Group(id).SendAsync("ReceiveMove", word);
        return Results.Ok();
    }
    return Results.BadRequest();
});

app.MapHub<GameHub>("/gamehub");

app.Run();

public class GameHub : Hub
{
    public async Task JoinRoom(string gameId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
    }
}
public record JoinRequest(string Name);
public partial class Program { }