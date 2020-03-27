import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { boardIdx, cellIdx } = this.props;
    this.props.onClick(boardIdx, cellIdx);
  }

  getClassName() {
    let className = 'cell';
    if (
      this.props.currentBoardIdx === this.props.boardIdx &&
      this.props.currentCellIdx === this.props.cellIdx
    ) {
      className = className + ' highlighted';
    }

    if (this.props.firstPlayerInputs.indexOf(this.props.cellIdx) > -1) {
      className = className + ' first-player-input';
    }

    if (this.props.secondPlayerInputs.indexOf(this.props.cellIdx) > -1) {
      className = className + ' second-player-input';
    }

    return className;
  }

  render() {
    return (
      <div className={this.getClassName()} onClick={this.onClick}>
        {this.props.value}
      </div>
    );
  }
}

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  boardIdx: PropTypes.number.isRequired,
  cellIdx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Cell;
