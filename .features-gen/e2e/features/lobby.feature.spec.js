// Generated from: e2e\features\lobby.feature
import { test } from "playwright-bdd";

test.describe('Game Lobby', () => {

  test('Host sees themselves in the lobby', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the start page', null, { page }); 
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

  test('User joins a game', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the start page', null, { page }); 
    await When('I enter the name "Anna"', null, { page }); 
    await And('I click on "GÅ MED I SPEL"', null, { page }); 
    await Then('I should see the roomcode input field', null, { page }); 
    await When('I type "ABCDEF" into the roomcode field', null, { page }); 
    await And('I click on "ANSLUT NU"', null, { page }); 
    await Then('I should be redirected to join-game url', null, { page }); 
    await And('I should see "Välkommen Anna"', null, { page }); 
    await And('I should see "Du är: Gäst"', null, { page }); 
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
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I enter the name \"Filiph\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Filiph\"","children":[{"start":18,"value":"Filiph","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And I click on \"SKAPA SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"SKAPA SPEL\"","children":[{"start":12,"value":"SKAPA SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to create-game url","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And I should see \"Välkommen Filiph\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Välkommen Filiph\"","children":[{"start":14,"value":"Välkommen Filiph","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see \"Du är: Värd\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Du är: Värd\"","children":[{"start":14,"value":"Du är: Värd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the \"SKAPA SPEL\" button should be disabled","stepMatchArguments":[{"group":{"start":4,"value":"\"SKAPA SPEL\"","children":[{"start":5,"value":"SKAPA SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I type \"Nicklas\" into the name field","stepMatchArguments":[{"group":{"start":7,"value":"\"Nicklas\"","children":[{"start":8,"value":"Nicklas","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the \"SKAPA SPEL\" button should be enabled","stepMatchArguments":[{"group":{"start":4,"value":"\"SKAPA SPEL\"","children":[{"start":5,"value":"SKAPA SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I enter the name \"Anna\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Anna\"","children":[{"start":18,"value":"Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I click on \"GÅ MED I SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"GÅ MED I SPEL\"","children":[{"start":12,"value":"GÅ MED I SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then I should see the roomcode input field","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I type \"ABCDEF\" into the roomcode field","stepMatchArguments":[{"group":{"start":7,"value":"\"ABCDEF\"","children":[{"start":8,"value":"ABCDEF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And I click on \"ANSLUT NU\"","stepMatchArguments":[{"group":{"start":11,"value":"\"ANSLUT NU\"","children":[{"start":12,"value":"ANSLUT NU","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to join-game url","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And I should see \"Välkommen Anna\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Välkommen Anna\"","children":[{"start":14,"value":"Välkommen Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And I should see \"Du är: Gäst\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Du är: Gäst\"","children":[{"start":14,"value":"Du är: Gäst","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":34,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":35,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given I am on the \"game\" page","stepMatchArguments":[{"group":{"start":12,"value":"\"game\"","children":[{"start":13,"value":"game","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"And I click on the button \"Avsluta spel\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Avsluta spel\"","children":[{"start":23,"value":"Avsluta spel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Vill du verkligen avsluta spelet?\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Vill du verkligen avsluta spelet?\"","children":[{"start":14,"value":"Vill du verkligen avsluta spelet?","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And I click \"Nej\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Nej\"","children":[{"start":9,"value":"Nej","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then I should still be at the game page","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":36,"tags":[],"steps":[{"pwStepLine":43,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"Given I am on the \"game\" page","stepMatchArguments":[{"group":{"start":12,"value":"\"game\"","children":[{"start":13,"value":"game","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"And I click on the button \"Avsluta spel\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Avsluta spel\"","children":[{"start":23,"value":"Avsluta spel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Vill du verkligen avsluta spelet?\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Vill du verkligen avsluta spelet?\"","children":[{"start":14,"value":"Vill du verkligen avsluta spelet?","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And I click \"Ja\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Ja\"","children":[{"start":9,"value":"Ja","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the start page","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":51,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given I am a guest in the lobby with code \"ABCDEF\"","stepMatchArguments":[{"group":{"start":36,"value":"\"ABCDEF\"","children":[{"start":37,"value":"ABCDEF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Väntar på att värden ska starta matchen...\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Väntar på att värden ska starta matchen...\"","children":[{"start":14,"value":"Väntar på att värden ska starta matchen...","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the button \"STARTA MATCH\" should not be visible","stepMatchArguments":[{"group":{"start":11,"value":"\"STARTA MATCH\"","children":[{"start":12,"value":"STARTA MATCH","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the game starts","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the \"game\" page","stepMatchArguments":[{"group":{"start":30,"value":"\"game\"","children":[{"start":31,"value":"game","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":58,"pickleLine":50,"tags":[],"steps":[{"pwStepLine":59,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given I am on the game page with code \"ABCDEF\"","stepMatchArguments":[{"group":{"start":32,"value":"\"ABCDEF\"","children":[{"start":33,"value":"ABCDEF","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then it should be \"Player 1\" turn","stepMatchArguments":[{"group":{"start":13,"value":"\"Player 1\"","children":[{"start":14,"value":"Player 1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the input for \"Player 2\" should be disabled","stepMatchArguments":[{"group":{"start":14,"value":"\"Player 2\"","children":[{"start":15,"value":"Player 2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":62,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When I type \"Kaffe\" into the \"Player 1\" input","stepMatchArguments":[{"group":{"start":7,"value":"\"Kaffe\"","children":[{"start":8,"value":"Kaffe","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":24,"value":"\"Player 1\"","children":[{"start":25,"value":"Player 1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"And I click on \"Skicka\"","stepMatchArguments":[{"group":{"start":11,"value":"\"Skicka\"","children":[{"start":12,"value":"Skicka","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Kaffe\" as the last chosen word","stepMatchArguments":[{"group":{"start":13,"value":"\"Kaffe\"","children":[{"start":14,"value":"Kaffe","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And I should see \"Player 1: Kaffe\" in the history sidebar","stepMatchArguments":[{"group":{"start":13,"value":"\"Player 1: Kaffe\"","children":[{"start":14,"value":"Player 1: Kaffe","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"And it should be \"Player 2\" turn","stepMatchArguments":[{"group":{"start":13,"value":"\"Player 2\"","children":[{"start":14,"value":"Player 2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end