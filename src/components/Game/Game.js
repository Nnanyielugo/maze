import React, { Component } from 'react';

import Board from '../Board/Board';
import Cell from '../Cell/Cell';
import helper_functions from './game-helper-functions';

class Game extends Component {
  state = {
    height: 0,
    width: 0,
    moves: 0
  }

  setGameState = () => {
    const { gameStarted } = this.state;
    this.setState({
      gameStarted: !gameStarted
    })
  }

  onInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const newState = {...this.state};

    newState[name] = +value;
    this.setState(newState)
  }

  start = () => {
    const { width, height, gameStarted } = this.state;
    const dimension = width * height;
    const list = Array.apply(null, {length: dimension});
    const game = helper_functions.printTilesToBoard(list, width, height)
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
  render(){
    const { gameStarted, moves, mushroomsCount, width, height } = this.state
    return (
      <div className="App">
        <header><h1>Maze</h1></header>

        <div>
          <p className="App-intro">Select width and height to start game</p>
          <input onChange={this.onInputChange} name="width" type="number" placeholder="Width" />
          <input onChange={this.onInputChange} name="height" type="number" placeholder="Height" />
          <hr />
          <button onClick={this.start} disabled={!this.state.width || !this.state.height} >Start</button>
        </div>

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
          <h3>Moves: {moves}</h3>
          <h3>Mushrooms left: {mushroomsCount}</h3>
          <h3>Board dimension: {width} X {height}</h3>
          <button onClick={this.setGameState}>Toggle</button>
        </Board>
        )}
      </div>
    )
  }
}

export default Game;