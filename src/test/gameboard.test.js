const Gameboard = require('../modules/gameboard');

describe('Gameboard class', () => {

    let gameboard;
    let fakeBattleship;
    let fakeDestroyer;

    beforeEach(() => {
        gameboard = new Gameboard();
        fakeBattleship = { length: 3, hit: jest.fn(), sunk: false };
        fakeDestroyer = { length: 2, hit: jest.fn(), sunk: false };
    });

    test('gameboard is type of a class / object', () => {
        expect(typeof gameboard).toBe('object');
    });

    test('placeShip method places a ship horizontally', () => {
        gameboard.placeShip(fakeBattleship, 0, 0, 'xAxis');
        expect(gameboard.board[0][0]).toEqual(fakeBattleship);
        expect(gameboard.board[0][1]).toEqual(fakeBattleship);
        expect(gameboard.board[0][2]).toEqual(fakeBattleship);
    });

    test('placeShip method places a ship vertically', () => {
        gameboard.placeShip(fakeBattleship, 0, 0, 'yAxis');
        expect(gameboard.board[0][0]).toEqual(fakeBattleship);
        expect(gameboard.board[1][0]).toEqual(fakeBattleship);
        expect(gameboard.board[2][0]).toEqual(fakeBattleship);
    });

    test('a user tries to place a ship outside of board', () => {
        expect(() => gameboard.placeShip(fakeBattleship, 0, 9, 'xAxis')).toThrow('Ship is out of bounds');
        expect(() => gameboard.placeShip(fakeBattleship, 9, 0, 'yAxis')).toThrow('Ship is out of bounds');
    });

    test('attackCoordinate method records a miss', () => {
        expect(gameboard.attackCoordinate(0, 0)).toBe('miss');
        expect(gameboard.board[0][0]).toBe('miss');
    });

    test('attackCoordinate method records a hit', () => {
        gameboard.board[2][2] = fakeBattleship;
        expect(gameboard.attackCoordinate(2, 2)).toBe('hit');
        expect(fakeBattleship.hit).toHaveBeenCalled();
    });

    test('attackCoordinate x or/and y is out of bounds', () => {
        expect(gameboard.attackCoordinate(-1, 0)).toBe(false);
    });

    test('attackCoordinate grid cell that has already called hit', () => {
        gameboard.attackCoordinate(1, 1);
        expect(gameboard.attackCoordinate(1, 1)).toBe(false);
    });

    test('isAllSunk method returns true if all battleships are sunk', () => {
        fakeBattleship.sunk = true;
        gameboard.board[5][5] = fakeBattleship;
        expect(gameboard.isAllSunk()).toBe(true);
    });

    test('isAllSunk method returns false if not all battleships are sunk', () => {
        gameboard.board[0][0] = fakeBattleship;
        expect(gameboard.isAllSunk()).not.toBe(true);
    });

    test('try to place a ship in occupied cells', () => {
        gameboard.placeShip(fakeBattleship, 0, 0, 'xAxis');
        expect(() => gameboard.placeShip(fakeDestroyer, 0, 0, 'xAxis')).toThrow('Another ship has taken this area')
    });
    
});