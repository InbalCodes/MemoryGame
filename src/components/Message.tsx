import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Store } from "../store";

@inject("store")
@observer
export class Message extends Component<{ store?: Store }, {}> {
  render() {
    const { winner, startOver } = this.props.store;

    return winner ? (
      <div className="message">
        <h1>Player {winner.id} Wins!</h1>
        <button onClick={startOver}>New Game</button>
      </div>
    ) : null;
  }
}
