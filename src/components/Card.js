import React from 'react';
import PropTypes from 'prop-types';
import {COLORS, FILLS, SHAPES, NUMBERS} from "../constants";
import '../styles/Card.css';

class Card extends React.Component {
  getImage() {
    const {color, fill, shape} = this.props;
    const url = `/assets/${shape}_${fill}_${color}.png`;
    return (
      <img class="Shape" src={url} />
    );
  }

  getShapes() {
    const {color, fill, shape, number} = this.props;

    const shapes = [];
    for (let i = 0; i < number; i++) {
      shapes.push(this.getImage())
    }
    return shapes;
  }
  render() {
    return (
      <div class="Card">
        {this.getShapes()}
      </div>
    );
  }
}

Card.propTypes = {
  color: PropTypes.oneOf(COLORS),
  fill: PropTypes.oneOf(FILLS),
  shape: PropTypes.oneOf(SHAPES),
  number: PropTypes.oneOf(NUMBERS),
}
export default Card;