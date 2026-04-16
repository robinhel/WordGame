using System.Runtime.CompilerServices;
using WordGame.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var games = new Dictionary<string, Game>();

Game game1 = new Game
{
    Id = "ABC123",
    CurrentRound = 1,
    Players = new List<Player>
    {
        new Player("Calle"),
        new Player("Player 2")
    }
};
games[game1.Id] = game1;

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
app.Run();