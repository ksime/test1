import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Li from './ListItem';

class Dog extends Component {
  displayNames() {
    const { name } = this.props;
    if (!name.length) {
      return null;
    }
    return name.map(dogName => <div>{dogName} </div>);
  }

  render() {
    const { breed } = this.props;
    return (
      <Li>
        <h3>{breed}</h3>
        <div>{this.displayNames()}</div>
      </Li>
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
