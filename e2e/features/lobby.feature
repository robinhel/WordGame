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
    Given I am on the "game-Time" page
    And I click on the button "Avsluta spel"
    Then I should see "Vill du verkligen avsluta spelet?"
    And I click "Nej"
    Then I should still be at the game page

  Scenario: User wants to quit the game and get redirected to the start page
    Given I am on the "game-Time" page
    And I click on the button "Avsluta spel"
    Then I should see "Vill du verkligen avsluta spelet?"
    And I click "Ja"
    Then I should be redirected to the start page