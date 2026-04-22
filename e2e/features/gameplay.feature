Feature: Gameplay

    Scenario: Skicka ett ord i matchen
        Given I am on the start page
        And a game exists with two players for room "123"
        When I enter the name "Värden"
        And I click on "SKAPA SPEL"
        And the host starts the match for room "123"
        When Player 1 writes the word "apa"
        When Player 1 clicks send
        Then the input field should be empty

    Scenario: Skicka ett ikke godkänt ord i matchen
        Given I am on the start page
        And a game exists with two players for room "123"
        When I enter the name "Värden"
        And I click on "SKAPA SPEL"
        And the host starts the match for room "123"
        When Player 1 writes an invalid word "zjsn123"
        When Player 1 clicks send
        Then the input field should NOT be empty
    
    Scenario: Inputfältet är låst när det är motståndarens tur
        Given I am on the start page
        And a game exists with two players for room "123"
        When I enter the name "Värden"
        And I click on "SKAPA SPEL"
        And the host starts the match for room "123"
        And it is the opponents turn in room "123"
        Then the input field should be disabled

        