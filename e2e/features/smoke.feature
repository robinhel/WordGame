Feature: Smoke-test

    Scenario: Startsidan går att öppna
        Given att jag öppnar startsidan
        Then ska jag se en rubrik på nivå 1 på sidan

    Scenario: API:et svarar via proxyn
        Given att jag öppnar "/api/hello" i webbläsaren
        Then ska jag se texten "Hello from .NET!"

    Scenario: Skapa spel-knapp är låst tills namn har skrivits in
        Given att jag öppnar startsidan
        Then ska knappen "SKAPA SPEL" vara inaktiverad
        When jag skriver in "Nicklas" i namnfältet
        Then ska knappen "SKAPA SPEL" vara aktiverad