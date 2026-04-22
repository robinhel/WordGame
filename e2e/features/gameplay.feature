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