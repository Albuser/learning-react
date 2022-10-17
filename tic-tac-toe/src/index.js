import React from "react";
import ReactDOM from "react-dom/client";
import { globals } from "./const.js";

let currentPlayer = "X";

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

class Board extends React.Component {
  render() {
    let rows = [];
    for (let i = 0; i < globals.numRows; i++) {
      let row = [];
      for (let j = 0; j < globals.numCols; j++) {
        row.push(
          React.createElement("div", {
            id: "Row: " + i + " Col: " + j,
            className: "boardSquare",
          })
        );
      }
      rows.push(
        React.createElement(
          "div",
          { id: "Row: " + i, className: "boardRow" },
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
      <ol className="history-list"></ol>
    );
    let status = React.createElement(
      "div",
      { className: "status" },
      <h3>
        <b>It's {currentPlayer}'s turn</b>
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
  render() {
    let game = React.createElement("div", { className: "game" }, [
      <Board />,
      <Panel />,
    ]);
    return React.createElement("div", { className: "app" }, [<Header />, game]);
  }
}

const app = <App />;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(app);
