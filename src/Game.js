import React from 'react';
import Board from './Board';
import { CELL_VALUE, getRandom } from './App';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showResult: false,
      currentBoardIdx: -1,
      currentCellIdx: -1,
      isMultiPlayer: false,
      currentPlayer: 1,
      deadBoards: [],
      boards: [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
      ],
      playerInputs: [
        { first: [], second: [] },
        { first: [], second: [] },
        { first: [], second: [] }
      ]
    };

    this.updateBoards = this.updateBoards.bind(this);
  }

  getIsDead(values) {
    // when first row is filled
    if (
      values[0] === values[1] &&
      values[0] === values[2] &&
      values[0] === CELL_VALUE
    ) {
      return true;
    }
    // when second row is filled
    if (
      values[3] === values[4] &&
      values[3] === values[5] &&
      values[3] === CELL_VALUE
    ) {
      return true;
    }

    // when third row is filled
    if (
      values[6] === values[7] &&
      values[6] === values[8] &&
      values[6] === CELL_VALUE
    ) {
      return true;
    }

    // when first column is filled
    if (
      values[0] === values[3] &&
      values[0] === values[6] &&
      values[0] === CELL_VALUE
    ) {
      return true;
    }

    // when second column is filled
    if (
      values[1] === values[4] &&
      values[1] === values[7] &&
      values[1] === CELL_VALUE
    ) {
      return true;
    }

    // when third column is filled
    if (
      values[2] === values[5] &&
      values[2] === values[8] &&
      values[2] === CELL_VALUE
    ) {
      return true;
    }

    // when first diagonal cells are filled
    if (
      values[0] === values[4] &&
      values[0] === values[8] &&
      values[0] === CELL_VALUE
    ) {
      return true;
    }

    // when second diagonal cells are filled
    if (
      values[2] === values[4] &&
      values[2] === values[6] &&
      values[2] === CELL_VALUE
    ) {
      return true;
    }

    return false;
  }

  updatePlayerInput(currentBoardIdx, currentCellIdx) {
    let { currentPlayer } = this.state;
    let playerInputs = this.state.playerInputs.map(inp => ({ ...inp }));
    let currBoardInputs = playerInputs[currentBoardIdx];
    let first = [...currBoardInputs.first];
    let second = [...currBoardInputs.second];
    if (currentPlayer === 1) {
      first = [...first, currentCellIdx];
    } else {
      second = [...second, currentCellIdx];
    }
    currBoardInputs = { first, second };
    playerInputs[currentBoardIdx] = currBoardInputs;
    this.setState({ playerInputs });
  }

  updateCurrentPlayer() {
    let currentPlayer = this.state.currentPlayer === 1 ? 2 : 1;
    this.setState({ currentPlayer });
  }

  updateCurrentCell(currentBoardIdx, currentCellIdx) {
    this.setState({ currentBoardIdx, currentCellIdx });
  }

  updateValueInBoard(currentBoardIdx, currentCellIdx, isComputerInput) {
    let boards = this.state.boards.map(board => [...board]);
    boards[currentBoardIdx][currentCellIdx] = CELL_VALUE;
    const values = boards[currentBoardIdx];
    const isDead = this.getIsDead(values);
    this.setState({ boards });
    if (isDead) {
      const deadBoards = [...this.state.deadBoards, currentBoardIdx];
      const showResult = deadBoards.length === 3;
      this.setState({ deadBoards, showResult });
      if (showResult) {
        return;
      }
    }

    if (!this.state.isMultiPlayer && !isComputerInput) {
      this.setState({ isLoading: true });
      setTimeout(() => this.computerInput(), 2000);
    }
  }

  // update the state of the boards after player input
  updateBoards(currentBoardIdx, currentCellIdx, isComputerInput = false) {
    this.updatePlayerInput(currentBoardIdx, currentCellIdx);
    this.updateCurrentPlayer();
    this.updateCurrentCell(currentBoardIdx, currentCellIdx);
    this.updateValueInBoard(currentBoardIdx, currentCellIdx, isComputerInput);
  }

  computerInput() {
    const inputIdx = this.chooseInput();
    const boardId = Math.floor(inputIdx / 9);
    const cellId = inputIdx % 9;
    this.updateBoards(boardId, cellId, true);
    this.setState({ isLoading: false });
  }

  chooseInput() {
    let boards = this.state.boards.map(board => [...board]);
    let idx = getRandom(27, 0);
    for (let i = 0; i < 27; i++) {
      idx = (idx + 1) % 27;
      let boardId = Math.floor(idx / 9);
      let cellId = idx % 9;
      let values = [...boards[boardId]];
      if (values[cellId] === CELL_VALUE) {
        continue;
      }
      values[cellId] = CELL_VALUE;
      let isDead = this.getIsDead(values);
      if (!isDead) {
        return idx;
      }
    }

    // when all possible places are occupied
    // put the value where ever possible
    for (let i = 0; i < 27; i++) {
      idx = (idx + 1) % 27;
      let boardId = Math.floor(idx / 9);
      let cellId = idx % 9;
      let values = [boards[boardId]];
      if (values[cellId] === CELL_VALUE) {
        continue;
      }
      return idx;
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <div className="loading"></div>}

        {!this.state.showResult && (
          <div className="App">
            <h2 style={{ margin: 0 }}>
              Turn: Player {this.state.currentPlayer}
            </h2>
          </div>
        )}

        {this.state.showResult && (
          <div className="App">
            <h2 style={{ margin: 0, color: 'green' }}>
              Player {this.state.currentPlayer} wins!
            </h2>
          </div>
        )}

        <div className="game">
          {this.state.boards.map((board, idx) => (
            <Board
              key={idx}
              boardIdx={idx}
              currentBoardIdx={this.state.currentBoardIdx}
              currentCellIdx={this.state.currentCellIdx}
              updateBoards={this.updateBoards}
              isMultiPlayer={this.state.isMultiPlayer}
              currentPlayer={this.state.currentPlayer}
              deadBoards={this.state.deadBoards}
              firstPlayerInputs={this.state.playerInputs[idx].first}
              secondPlayerInputs={this.state.playerInputs[idx].second}
              values={board}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
