import React from "react";
import ReactDOM from "react-dom/client";
import { globals } from "./const.js";

class Header extends React.Component {
  render() {
    let header = React.createElement(
      "div",
      { className: "header" },
      <h1>Tic-Tac-Toe</h1>
    );
    return header;
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: null, isActive: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleHover() {
    if (this.state.content == null) {
      this.setState({
        isActive: true,
      });
    }
  }

  handleLeave() {
    this.setState({
      isActive: false,
    });
  }

  handleClick() {
    if (this.state.content == null) {
      this.setState({
        content: this.props.currentPlayer,
      });
      let newPlayer = null;
      this.props.currentPlayer === "X" ? (newPlayer = "O") : (newPlayer = "X");
      this.props.onCurrentPlayerChange(
        this.props.currentPlayer,
        this.props.row,
        this.props.col,
        newPlayer
      );
    }
  }

  render() {
    let img = null;
    if (this.state.content === "X") {
      img = "X.png";
    } else if (this.state.content === "O") {
      img = "O.png";
    }

    let styles = {
      background: this.state.isActive ? "#fbe7c6" : "#ffaebc",
      Image: img,
    };

    if (img === null) {
      return (
        <div
          id={"Row: " + this.props.row + " Col: " + this.props.col}
          className="boardSquare"
          onMouseOver={this.handleHover}
          onClick={this.handleClick}
          onMouseLeave={this.handleLeave}
          style={styles}
        ></div>
      );
    }

    return (
      <div
        id={"Row: " + this.props.row + " Col: " + this.props.col}
        className="boardSquare"
        onMouseOver={this.handleHover}
        onClick={this.handleClick}
        onMouseLeave={this.handleLeave}
        style={styles}
      >
        <img src={img} alt={this.state.content}></img>
      </div>
    );
  }
}

class Board extends React.Component {
  render() {
    let rows = [];
    for (let i = 0; i < globals.numRows; i++) {
      let row = [];
      for (let j = 0; j < globals.numCols; j++) {
        let square = (
          <Square
            row={i}
            col={j}
            onCurrentPlayerChange={this.props.onCurrentPlayerChange}
            currentPlayer={this.props.currentPlayer}
          />
        );
        row.push(square);
      }
      rows.push(
        React.createElement(
          "div",
          {
            id: "Row: " + i,
            className: "boardRow",
          },
          row
        )
      );
    }
    let board = React.createElement("div", { className: "board" }, rows);
    return board;
  }
}

class Panel extends React.Component {
  render() {
    let title = React.createElement(
      "h2",
      { className: "paneltitle" },
      "Tic-Tac-Toe"
    );
    let restart = React.createElement(
      "button",
      { className: "button" },
      "Restart"
    );
    let history = React.createElement(
      "div",
      { className: "history" },
      <ol className="history-list">{this.props.history}</ol>
    );
    let status = React.createElement(
      "div",
      { className: "status" },
      <h3>
        <b>It's {this.props.currentPlayer}'s turn</b>
      </h3>
    );
    let panel = React.createElement("div", { className: "panel" }, [
      title,
      history,
      status,
      restart,
    ]);
    return panel;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPlayer: "X", history: [] };
    this.handleCurrentPlayerChange = this.handleCurrentPlayerChange.bind(this);
  }

  handleCurrentPlayerChange(lastPlayer, row, col, newPlayer) {
    console.log("App changed state to " + newPlayer);
    this.setState({ currentPlayer: newPlayer });
    let history = this.state.history;
    let histRow = React.createElement(
      "li",
      { className: "historyRow" },
      lastPlayer + ": row = " + row + " col = " + col
    );
    history.push(histRow);
  }

  render() {
    let game = React.createElement("div", { className: "game" }, [
      <Board
        currentPlayer={this.state.currentPlayer}
        onCurrentPlayerChange={this.handleCurrentPlayerChange}
      />,
      <Panel
        currentPlayer={this.state.currentPlayer}
        onCurrentPlayerChange={this.handleCurrentPlayerChange}
        history={this.state.history}
      />,
    ]);
    return React.createElement("div", { className: "app" }, [<Header />, game]);
  }
}

const app = <App />;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(app);
