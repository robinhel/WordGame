

using WordGame.Models;

var builder = WebApplication.CreateBuilder(args);
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




// ----------------------------------------------------- Endpoints --------------------------------------------------



app.MapPost("/create", () =>
{
    var game = CreateGame();

    return new
    {
        game.Id,
        url = $"/game/{game.Id}"
    };
});

app.MapGet("/game/{id}", (string id) =>
{
    var game = GetGame(id);

    return game is null
        ? Results.NotFound()
        : Results.Ok(game);
});

app.MapPost("/Start/{id}", (string id, string word) =>
{
    var success = StartGame(id, word);

    return success
        ? Results.Ok()
        : Results.BadRequest();
});

app.Run();

public partial class Program { }