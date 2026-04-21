using System.Text.RegularExpressions;
using WordGame.Models;

namespace App.Tests;

public class TddModelTests
{
    [Fact]
    public void GameId_ShouldBeSixUppercaseAlphaNumericCharacters()
    {
        var game = new Game();

        Assert.Matches(new Regex("^[A-Z0-9]{6}$"), game.Id);
    }

    [Fact]
    public void NewGame_ShouldHaveExpectedDefaults()
    {
        var game = new Game();

        Assert.Equal(1, game.CurrentRound);
        Assert.Equal("is", game.CurrentWord);
        Assert.False(game.IsStarted);
        Assert.False(game.IsFinished);
        Assert.Empty(game.Players);
        Assert.Empty(game.UsedWords);
    }

    [Fact]
    public void NewPlayer_ShouldHaveGuidId_AndName()
    {
        var player = new Player("Robin");

        Assert.Equal("Robin", player.Name);
        Assert.True(Guid.TryParse(player.Id, out _));
    }

    [Fact]
    public void MultipleGames_ShouldHaveDifferentIds()
    {
        var game1 = new Game();
        var game2 = new Game();

        Assert.NotEqual(game1.Id, game2.Id);
    }
}
