using WordGame.Services;

namespace App.Tests;

public class SwedishWordMatcherTests
{
    [Fact]
    public void TryMatch_ShouldMatchExactWord()
    {
        using var dictionary = new TestDictionary("""
            2
            jord/ADGTXY
            sol/ADX
            """);
        var matcher = new SwedishWordMatcher(dictionary.Path);

        var result = matcher.TryMatch("jord", out var matchedWord);

        Assert.True(result);
        Assert.Equal("jord", matchedWord);
    }

    [Fact]
    public void TryMatch_ShouldTrimAndLowercaseUserInput()
    {
        using var dictionary = new TestDictionary("""
            1
            jord/ADGTXY
            """);
        var matcher = new SwedishWordMatcher(dictionary.Path);

        var result = matcher.TryMatch("  JORD  ", out var matchedWord);

        Assert.True(result);
        Assert.Equal("jord", matchedWord);
    }

    [Fact]
    public void TryMatch_ShouldReturnFalseForUnknownWord()
    {
        using var dictionary = new TestDictionary("""
            1
            jord/ADGTXY
            """);
        var matcher = new SwedishWordMatcher(dictionary.Path);

        var result = matcher.TryMatch("banan", out var matchedWord);

        Assert.False(result);
        Assert.Equal("banan", matchedWord);
    }

    private sealed class TestDictionary : IDisposable
    {
        public TestDictionary(string content)
        {
            Path = System.IO.Path.GetTempFileName();
            File.WriteAllText(Path, content);
        }

        public string Path { get; }

        public void Dispose()
        {
            File.Delete(Path);
        }
    }
}
