import React, { Component } from 'react';

import Board from '../Board/Board';
import Cell from '../Cell/Cell';
import helper_functions from './game-helper-functions';

class Game extends Component {
  state = {
    cols: 0,
    rows: 0,
    moves: 0
  }

  setGameState = () => {
    const { gameStarted } = this.state;
    this.setState({
      gameStarted: !gameStarted
    })
  }

  onStart = event => {
    // setState somehow behaves erratically, which is why I have committed the grave sin of state mutation
    // please do not chop off my fingers
    this.state.rows = prompt("Select number of rows");
    this.state.cols = prompt("Select number of columns");

    console.log(this.state)

    if(this.state.rows <= 0 || this.state.cols <= 0){
      window.alert("You have not provided valid row and column values")
    } else { this.start()}
  }

  start = () => {
    const { rows, cols, gameStarted } = this.state;
    const dimension = rows * cols;
    const list = Array.apply(null, {length: dimension});
    const game = helper_functions.printTilesToBoard(list, rows, cols)
    const marioCells = helper_functions.getMarioCells(game.cells)
    const mushroomCells = helper_functions.getMushroomCells(game.cells)

    this.setState({
      dimension: dimension,
      game: game,
      moves: 0,
      playerCell: marioCells,
      mushroomsCount: mushroomCells.length
    });

    if(!gameStarted){
      this.setGameState()
    }
  }

  directMario = (e) => {
    let direction;
    
    switch(e.keyCode) {
        case 37:
            direction = { y: 0, x: -1 };
            break;
        case 38:
            direction = { y: -1, x: 0 };
            break;
        case 39:
            direction = { y: 0, x: 1 };
            break;
        case 40:
            direction = { y: 1, x: 0 };
            break;
        default:
            return;
    }

    this.movePlayer(direction);
  }

  movePlayer = (direction) =>{
    let { playerCell, moves, game, mushroomsCount } = this.state;

    const newMove = {
        x: playerCell.x + direction.y,
        y: playerCell.y + direction.x
    };

    const nextCell = helper_functions.getCellByCoords(game.cells, newMove);
    
    if(!nextCell){
        return;
    }

    if(nextCell.value === 'mushroom'){
        mushroomsCount--;         
    }
    nextCell.value = 'mario';
    playerCell.value = null;
    moves++;

    if(mushroomsCount === 0){
        window.alert(`Game over, you completed the game in ${moves} moves`);
    }

    const newCells = helper_functions.findCellandReplace(helper_functions.findCellandReplace(game.cells, nextCell), playerCell);

    this.setState({
        game: {
            cells: newCells
        },
        playerCell: nextCell,
        moves: moves,
        mushroomsCount: mushroomsCount
    });
  }
  render(){
    const { gameStarted, moves, mushroomsCount } = this.state;
    
    return (
      <div className="App">
        <header><h1>Maze</h1></header>

        {!gameStarted && (
          <div>
          <p className="App-intro">Select rows and columns to start game</p>
          
          <hr />
          <button onClick={this.onStart}>Start</button>
        </div>
        )}

        { gameStarted && (
          <Board>
          <table style={{margin: '0 auto'}}>
            <tbody>
              {this.state.game.cells.map((row, i) => {
                return(
                  <tr key={i}>
                    {row.map((col, i) => {
                      return <Cell key={i} cell={col} size={25} />
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        <div>
          <h3>Moves made: {moves}</h3>
          <h3>Mushrooms left: {mushroomsCount}</h3>
          <button onClick={this.setGameState} style={{padding: "4px"}}>Reset Game</button>
        </div>
         
        </Board>
        )}
      </div>
    )
  }

  componentDidMount(){
    window.onkeydown = this.directMario
  }
}

export default Game;