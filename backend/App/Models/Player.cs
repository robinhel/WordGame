namespace WordGame.Models;

public class Player
{
    public string Id { get; set; }
    public string Name { get; set; }

    public Player(string name)
    {
        Id = Guid.NewGuid().ToString();
        Name = name;
    }
}