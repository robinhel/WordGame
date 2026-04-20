namespace WordGame.Models;

public class Game
{
    public string Id { get; set; }

    public int CurrentRound { get; set; }

     public List<Player> Players { get; set; } = new List<Player>();

    public string CurrentWord { get; set; } = "is";

    public List<string> UsedWords { get; set; } = new();

    public int CurrentTurnIndex { get; set; }

    public bool IsStarted { get; set; } = false;

    public bool IsFinished { get; set; } = false;

    public Game()
    {
        Id = GenerateGameId();
        CurrentRound = 1;
    }

    private static string GenerateGameId(int length = 6)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var random = new Random();

        char[] result = new char[length];

        for (int i = 0; i < length; i++)
        {
            int index = random.Next(chars.Length);
            result[i] = chars[index];
        }

        return new string(result);
    }
}