import React from "react";
import Card from "./components/Card";
import "./styles/App.css";
import { SHUFFLED_DECK, isSet } from "./Set";
import { includes, remove } from "lodash";

const CARDS_TO_DEAL = 12;
const CARDS_IN_SET = 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [], // User selected
      highlighted: [], // Computer finds a set
      deck: SHUFFLED_DECK,
      table: [],
      error: false
    };
    this.selectCard = this.selectCard.bind(this);
    this.findSet = this.findSet.bind(this);
    this.flipMoreCards = this.flipMoreCards.bind(this);
  }

  componentDidMount() {
    const table = this.state.deck.slice(0, CARDS_TO_DEAL);
    this.setState({ table: table });

    const remainingDeck = this.state.deck.slice(
      CARDS_TO_DEAL,
      this.state.deck.length
    );
    this.setState({ deck: remainingDeck });
  }

  replaceSelected(selected) {
    const table = this.state.table.slice();
    const deck = this.state.deck.slice();

    selected.forEach(card => {
      const index = table.indexOf(card);
      const newCard = deck.pop();
      table[index] = newCard;
    });

    this.setState({ table, deck });
  }

  validateSet(selected) {
    if (isSet(selected)) {
      this.replaceSelected(selected);
      this.setState({ selected: [], error: false });
    } else {
      this.setState({ selected: [], error: true });
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
    if (this.state.error) {
      return <div className="Error">Not a set</div>;
    }
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
  }

  flipMoreCards() {
    const table = this.state.table.slice();
    const deck = this.state.deck.slice();

    const numCardsToFlip = Math.min(3, deck.length);
    for (let i = 0; i < numCardsToFlip; i++) {
      const newCard = deck.pop();
      table.push(newCard);
    }

    this.setState({ table, deck });
  }

  render() {
    return (
      <div className="App">
        <div className="Sidebar">
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
