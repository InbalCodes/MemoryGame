import { action, observable, computed, reaction } from "mobx";
import * as pics from "./images/cards";

export interface IPlayer {
  id: number;
  isTurn: boolean;
  points: number;
  isWinner: boolean;
}

export interface ICard {
  id: string;
  src: string;
  isRevealed: boolean;
  isMatched: boolean;
  type: string;
}

/* ============================== */

const playersArray: IPlayer[] = [
  { id: 1, isTurn: true, points: 0, isWinner: false },
  { id: 2, isTurn: false, points: 0, isWinner: false }
];

const cardNames: string[] = Object.keys(pics);

/* ============================== */

export class Store {
  @observable players: IPlayer[] = [];
  @observable cards: ICard[] = [];

  constructor() {
    this._initGame();
  }

  @action _initGame = (): void => {
    playersArray.forEach((p) => this.players.push(p));
    cardNames.forEach((c) => {
      let card1: ICard = {
        id: c + "1",
        type: c,
        src: pics[c],
        isRevealed: false,
        isMatched: false
      };
      let card2: ICard = {
        id: c + "2",
        type: c,
        src: pics[c],
        isRevealed: false,
        isMatched: false
      };
      this.cards.push(card1);
      this.cards.push(card2);
    });
    this.shuffle(this.cards);
  };

  @action revealCard = (cardId: string): void => {
    if (this.revealedCount < 2) {
      this.cards.find(({ id }) => id === cardId).isRevealed = true;
    }
  };

  @action startOver = () => {
    this.players.forEach((p) => {
      p.points = 0;
      p.isWinner = false;
      p.isTurn = p.id === 1;
    });
    this.cards.forEach((c) => {
      c.isRevealed = false;
      c.isMatched = false;
    });
  };

  @computed get revealedCount(): number {
    return this.cards.filter(
      ({ isRevealed, isMatched }) => isRevealed && !isMatched
    ).length;
  }

  @computed get winner(): IPlayer {
    return this.players.find(({ isWinner }) => isWinner);
  }

  checkMatch = reaction(
    () => this.revealedCount,
    (revealedCount) => {
      if (revealedCount >= 2) {
        let revealed = this.cards.filter(
          ({ isRevealed, isMatched }) => isRevealed && !isMatched
        );
        if (
          revealed[0] &&
          revealed[1] &&
          revealed[0].id.slice(0, -1) === revealed[1].id.slice(0, -1)
        ) {
          revealed[0].isMatched = true;
          revealed[1].isMatched = true;
          this.players.find(({ isTurn }) => isTurn === true).points += 1;
          if (this.cards.every((c) => c.isMatched)) {
            this.players.reduce(function (prev, current) {
              return prev.points > current.points ? prev : current;
            }, this.players[0]).isWinner = true;

            this.players.find(({ isTurn }) => isTurn === true).isWinner = true;
          }
        } else {
          setTimeout(() => {
            revealed[0].isRevealed = false;
            revealed[1].isRevealed = false;
          }, 1000);
          this.players.forEach((p) => (p.isTurn = !p.isTurn));
        }
      }
    }
  );

  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }
}

const store = new Store();
export default store;
