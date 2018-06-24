# Memory Game Project

## About this project

This Udacity FEND project required me to demonstrate mastery of HTML, CSS and JavaScript to convert a static project to an interactive one.

## How the game works

This single-player game consists of pairs of cards, each with different symbols on one side, arranged randomly on a grid with the symbol face down. For each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.
- The game ends once all cards have been correctly matched.

## Live game

Play the game by visiting: [https://mlhaus.github.io/fend-project-memory-game/](https://mlhaus.github.io/fend-project-memory-game/).

## Known Bugs

- The user can click on 3 or more cards really fast. I may want to prevent extra clicks until the first two cards turn back over.
- When there is one correct match, the user can click on already correctly guessed cards to have the move count go up.
- When the user clicks the game board outside the cards, the move count goes up and 'Uncaught TypeErrors' are thrown