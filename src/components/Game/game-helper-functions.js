import * as _ from 'lodash';
import helpers from '../../helper_functions/helperFunctions';

function newCell(value, x, y) {
  return{
    value, x, y, coord: [x, y]
  }
}

function flattenDeep(array){
  return array.reduce((a, b) => 
    a.concat(Array.isArray(b) ? flattenDeep(b) : b), []
  )
}

const newGame = (cells, time) => {
  return {
    cells: cells,
    time: time ? time : new Date(0, 0, 0, 0, 0, 0)
  }
}

const newBoard = (cells, total) => {
  const num = Math.ceil(0.1 * total);
  const gameCells = createMushroom(createMario(cells), num)
  return newGame(gameCells, null)
}

const createMario = cells => {
  const selected = selectRandomCell(cells);
  const marioCell = _.clone(selected);
  marioCell.value = 'mario';
  
  return findCellandReplace(cells, marioCell)
}

const createMushroom = (cells, num) => {
  if(!num) {
    return cells
  }
  const mushroom = selectRandomCell(cells);
  mushroom.value = 'mushroom';

  return createMushroom(findCellandReplace(cells, mushroom), num - 1)
}

const findCellandReplace = (cells, cell) => {
  return cells.map((row, i) => {
    if(getCellFromRow(row, i, cell.coord)){
      row[cell.y] = cell;
    }

    return row;
  })
}

const getCellFromRow = (row, index, coord) => {
  if(index !== coord[0]){
      return null;
  }
  return row.find(cell => cell.y === coord[1]);
}

const selectRandomCell = (cells) => {
  const selectedCell = _.sample(flattenDeep(cells));
  if(selectedCell.value) {
      return selectRandomCell(cells);
  }
  return selectedCell;
}

const getCellByCoords = (cells, coord) => {
  return _.find(flattenDeep(cells), cell => cell.x === coord.x && cell.y === coord.y);
}

const getMushroomCells = (cells) => {
  return flattenDeep(cells).filter(cell => cell.value === 'mushroom');
}

const getMarioCells = cells => {
  return _.find(flattenDeep(cells), cell => cell.value === 'mario')
}

const printTilesToBoard = (arrayInput, columns, rows) => {
  // let array = [];

  for(let i = 0; i < arrayInput.length; i++) {

    let board = [];
    for(let i = 0; i < columns; i++){
      let row = [];
      for(let j = 0; j < rows; j++) {
        row.push(newCell(null, i, j))
      }
      board.push(row)
    }
    console.log(board, arrayInput.length)
    return newBoard(board, arrayInput.length)
  }
}

const helper_functions = {printTilesToBoard, getMushroomCells, getMarioCells};
export default helper_functions;