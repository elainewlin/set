import React from "react";
import Card from "./components/Card";
import "./styles/App.css";
import { shuffledDeck, isSet } from "./Set";
import { includes, remove } from "lodash";

const CARDS_ON_TABLE = 12;
const CARDS_IN_SET = 3;

const MESSAGES = {
  INVALID_SET: "Not a set",
  NO_SET_FOUND: "No set found on the board. Flip more cards.",
  EMPTY_DECK: "No more cards in deck. Start a new game."
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [], // User selected
      highlighted: [], // Computer finds a set
      deck: [],
      table: [],
      message: null
    };
    this.baseState = this.state;

    this.selectCard = this.selectCard.bind(this);
    this.findSet = this.findSet.bind(this);
    this.flipMoreCards = this.flipMoreCards.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  setupBoard() {
    const deck = shuffledDeck();
    const table = deck.slice(0, CARDS_ON_TABLE);
    this.setState({ table: table });

    const remainingDeck = deck.slice(
      CARDS_ON_TABLE,
      deck.length
    );
    this.setState({ deck: remainingDeck });
  }

  componentDidMount() {
    this.setupBoard();
  }

  newGame() {
    this.setState(this.baseState);
    this.setupBoard();
  }

  replaceSelected(selected) {
    let table = this.state.table.slice();
    const deck = this.state.deck.slice();

    // We flipped another row of cards.
    if (table.length > CARDS_ON_TABLE) {
      table = table.filter(card => !selected.includes(card));
      return this.setState({table, deck});
    }

    selected.forEach(card => {
      const newCard = deck.pop();
      const index = table.indexOf(card);
      table[index] = newCard;
    });
    // Handle end of game when deck runs out of cards.
    table = table.filter(card => !!card);

    this.setState({ table, deck });
  }

  validateSet(selected) {
    if (isSet(selected)) {
      this.replaceSelected(selected);
      this.setState({ selected: [], message: null });
    } else {
      this.setState({ selected: [], message: MESSAGES.INVALID_SET });
    }
  }

  selectCard(element) {
    const selected = this.state.selected.slice();
    if (includes(selected, element)) {
      remove(selected, x => x === element);
    } else {
      selected.push(element);
    }

    this.setState({ selected, highlighted: [] });

    if (selected.length === CARDS_IN_SET) {
      setTimeout(() => this.validateSet(selected), 100);
    }
  }

  renderCards() {
    return this.state.table.map(card => {
      const isSelected = includes(this.state.selected, card);
      const isHighlighted = includes(this.state.highlighted, card);
      return (
        <Card
          card={card}
          selectCard={this.selectCard}
          isSelected={isSelected}
          isHighlighted={isHighlighted}
          key={card.id}
        />
      );
    });
  }

  renderMessage() {
    const {message} = this.state;
    if (!message) return;
    return (<div>{message}</div>);
  }

  findSet() {
    const table = this.state.table.slice();
    for (let i = 0; i < table.length; i++) {
      for (let j = i + 1; j < table.length; j++) {
        for (let k = j + 1; k < table.length; k++) {
          const combination = [table[i], table[j], table[k]];
          if (isSet(combination)) {
            return this.setState({
              highlighted: combination,
              selected: []
            });
          }
        }
      }
    }
    // No available sets
    this.setState({
      selected: [],
      message: MESSAGES.NO_SET_FOUND
    })
  }

  flipMoreCards() {
    const table = this.state.table.slice();
    const deck = this.state.deck.slice();

    if (deck.length === 0) {
      return this.setState({
        message: MESSAGES.EMPTY_DECK
      })
    }

    const numCardsToFlip = Math.min(3, deck.length);
    for (let i = 0; i < numCardsToFlip; i++) {
      const newCard = deck.pop();
      table.push(newCard);
    }

    this.setState({ table, deck, message: null });
  }

  render() {
    return (
      <div className="App">
        <div className="Sidebar">
          <button className="Button" onClick={this.newGame}>
            New Game
          </button>
          <button className="Button" onClick={this.findSet}>
            Find Set
          </button>
          <button className="Button" onClick={this.flipMoreCards}>
            Flip More Cards
          </button>
        </div>
        <div className="RightPanel">
          <div className="Grid">
            {this.renderCards()}
          </div>
          {this.renderMessage()}
        </div>
      </div>
    );
  }
}

export default App;
