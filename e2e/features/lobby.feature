Feature: Game Lobby

  Scenario: Host sees themselves in the lobby
    Given I am on the start page
    And create game API is mocked for host "Filiph" and room "ABC123"
    When I enter the name "Filiph"
    And I click on "SKAPA SPEL"
    Then I should be redirected to create-game url
    And I should see "Välkommen Filiph"
    And I should see "Du är: Värd"

  Scenario: "Create game" button is locked until a name is entered
    Given I am on the start page
    Then the "SKAPA SPEL" button should be disabled
    When I type "Nicklas" into the name field
    Then the "SKAPA SPEL" button should be enabled

  Scenario: User opens join form and sees room input
    Given I am on the start page
    When I enter the name "Anna"
    And I click on "GÅ MED I SPEL"
    Then I should see the roomcode input field

  Scenario: User joins a game with a valid room code
    Given I am on the start page
    And join game API is mocked for host "Anna" and room "QWE123"
    When I enter the name "Anna"
    And I click on "GÅ MED I SPEL"
    And I type "QWE123" into the roomcode field
    And I click on "ANSLUT NU"
    Then I should be redirected to join-game url
    And I should see "Välkommen Anna"
    And I should see "Du är: Gäst"

  Scenario: Join button is disabled until room code has 6 characters
    Given I am on the start page
    When I enter the name "Anna"
    And I click on "GÅ MED I SPEL"
    When I type "ABCD" into the roomcode field
    Then the "ANSLUT NU" button should be disabled

  Scenario: User wants to quit the game but cancels
    Given I am on the "game" page
    And I click on the button "Avsluta spel"
    Then I should see "Vill du verkligen avsluta spelet?"
    And I click "Nej"
    Then I should still be at the game page

  Scenario: User wants to quit the game and get redirected to the start page
    Given I am on the "game" page
    And I click on the button "Avsluta spel"
    Then I should see "Vill du verkligen avsluta spelet?"
    And I click "Ja"
    Then I should be redirected to the start page

  Scenario: Guest waits in lobby and gets redirected when game starts
    Given I am a guest in the lobby with code "ABCDEF"
    Then I should see "Väntar på att värden ska starta matchen..."
    Then the button "STARTA MATCH" should not be visible
    When the game starts
    Then I should be redirected to the "game" page

    Scenario: Players can submit words and turn passes
      Given I am on the game page with code "ABCDEF"
      Then it should be "Player 1" turn
      Then the input for "Player 2" should be disabled
      When I type "Kaffe" into the "Player 1" input
      And I click on "Skicka"
      Then I should see "Kaffe" as the last chosen word
      And I should see "Player 1: Kaffe" in the history sidebar
      And it should be "Player 2" turn 

    Scenario: Turn passes from Player 1 to Player 2
      Given I am on the game page with code "ABCDEF"
      When I type "Kaffe" into the "Player 1" input
      And I click on "Skicka"
      Then the input for "Player 1" should be disabled
      And the input for "Player 2" should be enabled
      And it should be "Player 2" turn 

    Scenario: Show error message when room code is too short
      Given I am on the start page
      When I enter the name "Filiph"
      And I click on "GÅ MED I SPEL"
      When I type "123" into the roomcode field
      And I click on "ANSLUT NU"
      Then I should see the error "Rumskoden måste vara exakt 6 tecken."

