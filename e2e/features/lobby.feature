Feature: Game Lobby

Scenario: Host sees themselves in the lobby
Given I am on the start page
When I enter the name "Filiph"
And I click on "SKAPA SPEL"
Then I should be redirected to create-game url
And I should see "Välkommen Filiph"