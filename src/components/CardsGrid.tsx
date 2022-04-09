import React, { Component } from "react";
import { ICard } from "../store";
import { Card } from "./Card";
import { observer } from "mobx-react";

@observer
export class CardsGrid extends Component<
  { cards: ICard[]; winner: boolean },
  {}
> {
  render() {
    return (
      <div className={"cards-grid" + (this.props.winner ? " winner" : "")}>
        {this.props.cards.map((c) => (
          <Card key={c.id} card={c} />
        ))}
      </div>
    );
  }
}
