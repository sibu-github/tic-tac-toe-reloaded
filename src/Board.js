import React from 'react';
import Cell from './Cell';
import { CELL_VALUE } from './App';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
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

  onCellClick(boardIdx, cellIdx) {
    if (boardIdx !== this.props.boardIdx) {
      return;
    }
    // ignore click if the board is already dead
    if (this.props.deadBoards.indexOf(this.props.boardIdx) > -1) {
      return;
    }

    // ignore if clicked on non empty cell
    const values = [...this.props.values];
    if (values[cellIdx] === CELL_VALUE) {
      return;
    }
    // update the boards
    this.props.updateBoards(boardIdx, cellIdx);
  }

  render() {
    const { firstPlayerInputs, secondPlayerInputs } = this.props;
    const isDead = this.props.deadBoards.indexOf(this.props.boardIdx) > -1;
    return (
      <div
        className="board"
        style={isDead ? { backgroundColor: '#000000b0' } : {}}>
        {[0, 1, 2].map(v => (
          <div className="row" key={`row-${v}`}>
            {[0, 1, 2].map(c => (
              <Cell
                key={`cell-${c}`}
                cellIdx={v * 3 + c}
                value={this.props.values[v * 3 + c]}
                onClick={this.onCellClick}
                firstPlayerInputs={firstPlayerInputs}
                secondPlayerInputs={secondPlayerInputs}
                {...this.props}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;
