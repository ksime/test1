import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Dog extends Component {
  displayNames() {
    const { name } = this.props;
    if (!name.length) {
      return null;
    }
    return name.map(dogName => <ListGroupItem>{dogName} </ListGroupItem>);
  }

  render() {
    const { breed } = this.props;
    return (
      <ListGroupItem header={breed}>
        <ListGroup>{this.displayNames()}</ListGroup>
      </ListGroupItem>
    );
  }
}

Dog.propTypes = {
  name: PropTypes.string,
  breed: PropTypes.arrayOf(PropTypes.string),
};

Dog.defaultProps = {
  name: '',
  breed: [],
};

export default Dog;
