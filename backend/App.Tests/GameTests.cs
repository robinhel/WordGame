using WordGame.Models;

public class GameTests
{
    [Fact]
    public void CreateGame_ShouldGenerateId()
    {
        var game = new Game();

        Assert.NotNull(game.Id);

        Assert.Equal(6, game.Id.Length);
    }


    [Fact]
    public void NewGame_ShouldStartAtRound1()
    {
        var game = new Game();

        Assert.Equal(1, game.CurrentRound);
    }


    [Fact]
    public void AddPlayer_ShouldIncreasePlayerCount()
    {
        var game = new Game();

        game.Players.Add(new Player("Anna"));

        Assert.Single(game.Players);
    }
}