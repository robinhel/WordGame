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
    await When('I type "ABCD" into the roomcode field', null, { page }); 
    await And('I click on "ANSLUT NU"', null, { page }); 
    await Then('I should be redirected to join-game url', null, { page }); 
    await And('I should see "Välkommen Anna"', null, { page }); 
    await And('I should see "Du är: Gäst"', null, { page }); 
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
  {"pwTestLine":22,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given I am on the start page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I enter the name \"Anna\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Anna\"","children":[{"start":18,"value":"Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I click on \"GÅ MED I SPEL\"","stepMatchArguments":[{"group":{"start":11,"value":"\"GÅ MED I SPEL\"","children":[{"start":12,"value":"GÅ MED I SPEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then I should see the roomcode input field","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I type \"ABCD\" into the roomcode field","stepMatchArguments":[{"group":{"start":7,"value":"\"ABCD\"","children":[{"start":8,"value":"ABCD","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And I click on \"ANSLUT NU\"","stepMatchArguments":[{"group":{"start":11,"value":"\"ANSLUT NU\"","children":[{"start":12,"value":"ANSLUT NU","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to join-game url","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And I should see \"Välkommen Anna\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Välkommen Anna\"","children":[{"start":14,"value":"Välkommen Anna","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And I should see \"Du är: Gäst\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Du är: Gäst\"","children":[{"start":14,"value":"Du är: Gäst","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end