// Generated from: e2e\features\lobby.feature
import { test } from "playwright-bdd";

test.describe('Game Lobby', () => {

  test('Host sees themselves in the lobby', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the start page', null, { page }); 
    await And('create game API is mocked for host "Filiph" and room "ABC123"', null, { page }); 
    await When('I enter the name "Filiph"', null, { page }); 
    await And('I click on "SKAPA SPEL"', null, { page }); 
    await Then('I should be redirected to create-game url', null, { page }); 
    await And('I should see "Välkommen Filiph"', null, { page }); 
    await And('I should see "Du är: Värd"', null, { page }); 
  });

  test('"Create game" button is locked until a name is entered', async ({ Given, When, Then, page }) => { 
    await Given('I am on the start page', null, { page }); 
    await Then('the "SKAPA SPEL" button should be disabled', null, { page }); 
    await When('I type "Nicklas" into the name field', null, { page }); 
    await Then('the "SKAPA SPEL" button should be enabled', null, { page }); 
  });

  test('User opens join form and sees room input', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the start page', null, { page }); 
    await When('I enter the name "Anna"', null, { page }); 
    await And('I click on "GÅ MED I SPEL"', null, { page }); 
    await Then('I should see the roomcode input field', null, { page }); 
  });

  test('User joins a game with a valid room code', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the start page', null, { page }); 
    await And('join game API is mocked for host "Anna" and room "QWE123"', null, { page }); 
    await When('I enter the name "Anna"', null, { page }); 
    await And('I click on "GÅ MED I SPEL"', null, { page }); 
    await And('I type "QWE123" into the roomcode field', null, { page }); 
    await And('I click on "ANSLUT NU"', null, { page }); 
    await Then('I should be redirected to join-game url', null, { page }); 
    await And('I should see "Välkommen Anna"', null, { page }); 
    await And('I should see "Du är: Gäst"', null, { page }); 
  });

  test('Join button is disabled until room code has 6 characters', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the start page', null, { page }); 
    await When('I enter the name "Anna"', null, { page }); 
    await And('I click on "GÅ MED I SPEL"', null, { page }); 
    await When('I type "ABCD" into the roomcode field', null, { page }); 
    await Then('the "ANSLUT NU" button should be disabled', null, { page }); 
  });

  test('User wants to quit the game but cancels', async ({ Given, Then, And, page }) => { 
    await Given('I am on the "game" page', null, { page }); 
    await And('I click on the button "Avsluta spel"', null, { page }); 
    await Then('I should see "Vill du verkligen avsluta spelet?"', null, { page }); 
    await And('I click "Nej"', null, { page }); 
    await Then('I should still be at the game page', null, { page }); 
  });

  test('User wants to quit the game and get redirected to the start page', async ({ Given, Then, And, page }) => { 
    await Given('I am on the "game" page', null, { page }); 
    await And('I click on the button "Avsluta spel"', null, { page }); 
    await Then('I should see "Vill du verkligen avsluta spelet?"', null, { page }); 
    await And('I click "Ja"', null, { page }); 
    await Then('I should be redirected to the start page', null, { page }); 
  });

  test('Guest waits in lobby and gets redirected when game starts', async ({ Given, When, Then, page }) => { 
    await Given('I am a guest in the lobby with code "ABCDEF"', null, { page }); 
    await Then('I should see "Väntar på att värden ska starta matchen..."', null, { page }); 
    await Then('the button "STARTA MATCH" should not be visible', null, { page }); 
    await When('the game starts', null, { page }); 
    await Then('I should be redirected to the "game" page', null, { page }); 
  });

  test('Players can submit words and turn passes', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the game page with code "ABCDEF"', null, { page }); 
    await Then('it should be "Player 1" turn', null, { page }); 
    await Then('the input for "Player 2" should be disabled', null, { page }); 
    await When('I type "Kaffe" into the "Player 1" input', null, { page }); 
    await And('I click on "Skicka"', null, { page }); 
    await Then('I should see "Kaffe" as the last chosen word', null, { page }); 
    await And('I should see "Player 1: Kaffe" in the history sidebar', null, { page }); 
    await And('it should be "Player 2" turn', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e\\features\\lobby.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"And create game API is mocked for host \"Filiph\" and room \"ABC123\"","stepMatchArguments":[{"group":{"start":35,"value":"\"Filiph\"","children":[{"start":36,"value":"Filiph","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"ABC123\"","children":[{"start":54,"value":"ABC123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I enter the name \"Filiph\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Filiph\"","children":[{"start":18,"value":"Filiph","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And I click on \"SKAPA SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"SKAPA SPEL\"","children":[{"start":12,"value":"SKAPA SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to create-game url","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see \"Välkommen Filiph\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Välkommen Filiph\"","children":[{"start":14,"value":"Välkommen Filiph","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And I should see \"Du är: Värd\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Du är: Värd\"","children":[{"start":14,"value":"Du är: Värd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the \"SKAPA SPEL\" button should be disabled","stepMatchArguments":[{"group":{"start":4,"value":"\"SKAPA SPEL\"","children":[{"start":5,"value":"SKAPA SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I type \"Nicklas\" into the name field","stepMatchArguments":[{"group":{"start":7,"value":"\"Nicklas\"","children":[{"start":8,"value":"Nicklas","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the \"SKAPA SPEL\" button should be enabled","stepMatchArguments":[{"group":{"start":4,"value":"\"SKAPA SPEL\"","children":[{"start":5,"value":"SKAPA SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":23,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":24,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I enter the name \"Anna\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Anna\"","children":[{"start":18,"value":"Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I click on \"GÅ MED I SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"GÅ MED I SPEL\"","children":[{"start":12,"value":"GÅ MED I SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then I should see the roomcode input field","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":24,"tags":[],"steps":[{"pwStepLine":31,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"And join game API is mocked for host \"Anna\" and room \"QWE123\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Anna\"","children":[{"start":34,"value":"Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":49,"value":"\"QWE123\"","children":[{"start":50,"value":"QWE123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When I enter the name \"Anna\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Anna\"","children":[{"start":18,"value":"Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And I click on \"GÅ MED I SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"GÅ MED I SPEL\"","children":[{"start":12,"value":"GÅ MED I SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And I type \"QWE123\" into the roomcode field","stepMatchArguments":[{"group":{"start":7,"value":"\"QWE123\"","children":[{"start":8,"value":"QWE123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And I click on \"ANSLUT NU\"","stepMatchArguments":[{"group":{"start":11,"value":"\"ANSLUT NU\"","children":[{"start":12,"value":"ANSLUT NU","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to join-game url","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And I should see \"Välkommen Anna\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Välkommen Anna\"","children":[{"start":14,"value":"Välkommen Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And I should see \"Du är: Gäst\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Du är: Gäst\"","children":[{"start":14,"value":"Du är: Gäst","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":35,"tags":[],"steps":[{"pwStepLine":43,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When I enter the name \"Anna\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Anna\"","children":[{"start":18,"value":"Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And I click on \"GÅ MED I SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"GÅ MED I SPEL\"","children":[{"start":12,"value":"GÅ MED I SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When I type \"ABCD\" into the roomcode field","stepMatchArguments":[{"group":{"start":7,"value":"\"ABCD\"","children":[{"start":8,"value":"ABCD","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the \"ANSLUT NU\" button should be disabled","stepMatchArguments":[{"group":{"start":4,"value":"\"ANSLUT NU\"","children":[{"start":5,"value":"ANSLUT NU","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":50,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":51,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Given I am on the \"game-Time\" page","stepMatchArguments":[{"group":{"start":12,"value":"\"game-Time\"","children":[{"start":13,"value":"game-Time","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"And I click on the button \"Avsluta spel\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Avsluta spel\"","children":[{"start":23,"value":"Avsluta spel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Vill du verkligen avsluta spelet?\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Vill du verkligen avsluta spelet?\"","children":[{"start":14,"value":"Vill du verkligen avsluta spelet?","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And I click \"Nej\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Nej\"","children":[{"start":9,"value":"Nej","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then I should still be at the game page","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":49,"tags":[],"steps":[{"pwStepLine":59,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given I am on the \"game-Time\" page","stepMatchArguments":[{"group":{"start":12,"value":"\"game-Time\"","children":[{"start":13,"value":"game-Time","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And I click on the button \"Avsluta spel\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Avsluta spel\"","children":[{"start":23,"value":"Avsluta spel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Vill du verkligen avsluta spelet?\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Vill du verkligen avsluta spelet?\"","children":[{"start":14,"value":"Vill du verkligen avsluta spelet?","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":62,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And I click \"Ja\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Ja\"","children":[{"start":9,"value":"Ja","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the start page","stepMatchArguments":[]}]},
]; // bdd-data-end