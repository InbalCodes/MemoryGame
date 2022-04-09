import React, { Component } from "react";
import { Store } from "../store";
import { Board } from "./Board";

export class Game extends Component<{ store?: Store }, {}> {
  render() {
    return (
      <div className="game">
        <h1>
          <div>
            <span className="white" />
            <span />
            <span />
            <span className="white" />
          </div>
          <span>Memory Game</span>
        </h1>
        <Board />
      </div>
    );
  }
}
