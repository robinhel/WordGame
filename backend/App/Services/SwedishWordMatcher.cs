namespace WordGame.Services;

public sealed class SwedishWordMatcher
{
    private readonly Lazy<HashSet<string>> _words;

    public SwedishWordMatcher(string dictionaryPath)
    {
        DictionaryPath = dictionaryPath;
        _words = new Lazy<HashSet<string>>(LoadWords);
    }

    public string DictionaryPath { get; }

    public bool TryMatch(string? input, out string matchedWord)
    {
        matchedWord = NormalizeWord(input);

        return matchedWord.Length > 0 && _words.Value.Contains(matchedWord);
    }

    public static SwedishWordMatcher FromDefaultDictionary()
    {
        var dictionaryPath = FindDictionaryPath("sv_SE.dic");

        if (dictionaryPath is null)
            throw new FileNotFoundException("Could not find sv_SE.dic in the app folder or any parent folder.");

        return new SwedishWordMatcher(dictionaryPath);
    }

    private HashSet<string> LoadWords()
    {
        var words = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var line in File.ReadLines(DictionaryPath))
        {
            var word = NormalizeDictionaryLine(line);

            if (word.Length > 0)
                words.Add(word);
        }

        return words;
    }

    private static string NormalizeDictionaryLine(string line)
    {
        var word = NormalizeWord(line);

        if (int.TryParse(word, out _))
            return string.Empty;

        var flagStart = word.IndexOf('/');

        return flagStart >= 0
            ? word[..flagStart]
            : word;
    }

    private static string NormalizeWord(string? word)
    {
        return string.IsNullOrWhiteSpace(word)
            ? string.Empty
            : word.Trim().ToLowerInvariant();
    }

    private static string? FindDictionaryPath(string fileName)
    {
        var directories = new[]
        {
            AppContext.BaseDirectory,
            Directory.GetCurrentDirectory()
        };

        foreach (var startDirectory in directories)
        {
            var directory = new DirectoryInfo(startDirectory);

            while (directory is not null)
            {
                var candidate = Path.Combine(directory.FullName, fileName);

                if (File.Exists(candidate))
                    return candidate;

                directory = directory.Parent;
            }
        }

        return null;
    }
}
