import React from 'react';
import Card from  './components/Card';
import './styles/App.css';
import {SHUFFLED_DECK, isSet} from './Set';
import {includes, remove} from 'lodash';

const CARDS_TO_DEAL = 12;
const CARDS_IN_SET = 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      deck: SHUFFLED_DECK,
      table: [],
      error: false
    };
    this.selectCard = this.selectCard.bind(this);
  }

  componentDidMount() {
    const table = this.state.deck.slice(0, CARDS_TO_DEAL);
    this.setState({table: table});

    const remainingDeck = this.state.deck.slice(CARDS_TO_DEAL, this.state.deck.length);
    this.setState({deck: remainingDeck});
  }

  replaceSelected(selected) {
    const table = this.state.table.slice();
    const deck = this.state.deck.slice();

    selected.forEach((card) => {
      const index = table.indexOf(card);
      const newCard = deck.pop();
      table[index] = newCard;
    })

    this.setState({table, deck});
  }

  validateSet(selected) {
    if (isSet(selected)) {
      this.replaceSelected(selected);
      this.setState({selected: [], error: false});
    } else {
      this.setState({selected: [], error: true});
    }
  }

  selectCard(element) {
    const selected = this.state.selected.slice();
    if (includes(selected, element)) {
      remove(selected, (x) => x === element);
    } else {
      selected.push(element);      
    }

    this.setState({selected})

    if (selected.length === CARDS_IN_SET) {
      setTimeout(() => this.validateSet(selected), 100);
    }

  }

  renderCards() {
    return this.state.table.map((card) => {
      return (
        <Card 
          card={card}
          selectCard={this.selectCard}
          selected={this.state.selected}
          key={card.id}
        />
      )
    })
  }

  renderError() {
    if (this.state.error) {
      return (
        <div className="Error">
          Not a set
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <div className="Grid">
          {this.renderCards()}
          {this.renderError()}
        </div>
      </div>
    );
  }
}

export default App;
