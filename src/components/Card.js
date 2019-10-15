import React from 'react';
import PropTypes from 'prop-types';
import {COLORS, FILLS, SHAPES, NUMBERS} from "../constants";
import '../styles/Card.css';
import {includes} from "lodash";
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.selectCard(this.props.card);
  }

  getShapes() {
    const {number, color, fill, shape} = this.props.card;
    const image = `${shape}_${fill}_${color}`
    const url = `/assets/${image}.png`;
    const shapes = [];
    for (let i = 0; i < number; i++) {
      const key = `${url}_${i}`
      shapes.push(<img className="Shape" src={url} key={key} alt={image} />)
    }
    return shapes;
  }

  render() {
    const {selected, card} = this.props;
    const isSelected = includes(selected, card);
    const className = isSelected ? "Card selected" : "Card";

    return (
      <div className={className} onClick={this.onClick}>
        {this.getShapes()}
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    color: PropTypes.oneOf(COLORS),
    fill: PropTypes.oneOf(FILLS),
    shape: PropTypes.oneOf(SHAPES),
    number: PropTypes.oneOf(NUMBERS),
    id: PropTypes.string
  }),
  selectCard: PropTypes.func,
  selected: PropTypes.array
}
export default Card;