# ⚓ Battleship

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=99425B)

![Responsive of Battleship](./doc/screenshot.png)

## Introduction
**Battleship** is an iconic strategy game for two players (or player vs AI) where the objective is to sink all of your opponent's ships before they sink yours. 

### Gameplay Overview
1. Preparation Phase
    - Each player arranges their ships on their grid either manually or randomly.
    - Ships cannot overlap and can be placed horizontally or vertically.
2. Battle Phase
    - Players take turns guessing coordinates to target the opponent's ships.
    - Opponent responds with "hit" if a ship is attacked, or "miss" otherwise.
    - When all coordinates of a ship are hit, the ship is considered sunk.

3. Endgame: Winning the Game
    - The game ends when one player has sunk all the opponent's ships.
    - That player is declared victorious.


## 📑 Table of Contents
- [The Vision](#-the-vision)
- [Features](#-features)
- [UI/UX](#-uiux)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Testing](#-testing)
- [Future Improvements](#-future-improvements)


## 🎯 The Vision


## 🎨 UI/UX 


## ✨ Features


## 🚀 Getting Started
**Prerequisites**


### Installation & Setup


## ⚡Usage


## 🛠️ Tech Stack
- **HTML5** – Utilized semantic markup to ensure a highly accessible for the 10×10 coordinate grids and interactive UI components.
- **CSS3** – Implemented modern layout techniques including Flexbox and CSS Grid, utilizing Custom Properties (Variables) for a maintainable and responsive design across all device sizes.
- **JavaScript (ES6+)** – Engineered the core game engine using Modular JS. Leveraged advanced concepts like ES6 Classes and Array methods to manage game logic, AI behaviour, and DOM manipulation.
- **Webpack** – Configured a custom build pipeline to bundle modules, manage assets, and utilize Loaders for an optimized production-ready distribution.
- **Jest** – Integrated a robust automated testing suite. Followed a TDD (Test-Driven Development) workflow to validate the integrity of the Battleship and Gameboard logic before UI integration.
- **ESLint** – Enforced high-quality code standards and consistent style guides, ensuring the codebase remains clean, readable, and free of common syntax anti-patterns.

## 🧠 Architecture
### AI: Hunt & Target Algorithm
The AI module controls the computer's decision making. It implements a *Hunt & Target strategy*, allowing the AI to anticipate future coordinates once a player's ship has been hit and efficiently locate the remaining parts of the ship.
**1. Hunting Mode**
At the start of the game, the computer fires at a random cell using a `do... while` loop that keeps generating coordinates until it finds a coordinate that hasn't already been attacked.
- A random coordinate is generated.
- The algorithm ensures the coordinate has not been previously attacked.
- This enables efficient board exploration until a player's ship is discovered.
```js
do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
} while (this.player.gameboard.board[x][y] === 'hit' || this.player.gameboard.board[x][y] === 'miss');
```
The computer remains in Hunting Mode until a successful hit occurs, triggering a transition to Target Mode.
**2. Target Mode**
Once a hit is registered, the computer switches to Target Mode, concentrating attacks on the surrounding area.
- Previous successful hits are stored in the `this.nextAttacks` array property.
- The computer calculates and attempts attacks on adjacent coordinates (up, down, left, right) of the last successful hit.
```js
const coordinates = [
    [lastHitX - 1, lastHitY], [lastHitX + 1, lastHitY],
    [lastHitX, lastHitY - 1], [lastHitX, lastHitY + 1]
];
``` 
**3. Attack Anticipation and Tracking**
When the attack is successful, the `attackCoordinate(x, y)` method processes hit result for the computer and the coordinate is pushed into the `nextAttacks` stack so the computer can continue targeting the same ship on subsequent turns.
- If the attack results in a hit, the coordinate is stored for future targeting.
- Else, the coordinate will be ignored and the computer will use the next available coordinate in the `nextAttacks` stack.
```js
const hitSuccessful = this.player.gameboard.attackCoordinate(x, y);
if (hitSuccessful === 'hit') {
    this.nextAttacks.push([x, y]);
}
```
Once the ship is sunk, `nextAttacks` is cleared and the computer switches back to Hunting Mode until the next hit. This follows a stack (FILO - First In, Last Out) principle.
**4. Valid Attack Check**
Before committing to any coordinate, the algorithm must validate it to ensure:
- It falls within the 10x10 grid and 
- It hasn't already been attacked previously.
```js
validAttack(x, y) {
    return x >= 0 && x < 10 &&
           y >= 0 && y < 10 &&
           this.player.gameboard.board[x][y] !== 'hit' &&
           this.player.gameboard.board[x][y] !== 'miss';
}
```

This simple yet powerful algorithm balances exploration and attack mode, enabling the computer to efficiently discover ships while aggressively completing confirmed targets, resulting in a more strategic and human-like opponent.

## 🧩 Development Principles


## 🧪 Testing


## 🔮 Future Improvements
