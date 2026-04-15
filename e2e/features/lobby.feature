Feature: Game Lobby

Scenario: Host sees themselves in the lobby
Given I am on the start page
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