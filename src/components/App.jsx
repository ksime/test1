import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dog from './Dog';
import * as actions from '../actions';

class App extends Component {
  static compareDirectDogs(a, b) {
    if (a.breed > b.breed) {
      return 1;
    }
    return -1;
  }

  static compareReverseDogs(a, b) {
    if (a.breed > b.breed) {
      return -1;
    }
    return 1;
  }

  constructor(props) {
    super(props);
    this.state = {
      display: false,
      dogs: '',
      list: [],
    };
  }

  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(blob => blob.json())
      .then((json) => {
        const list = json.message;
        const dogs = [];
        Object.keys(list).forEach((key) => {
          dogs.push({ breed: key, name: list[key] });
        });
        this.props.fetchList(dogs);
      });
  }

  handleShowAllClick() {
    this.setState({ display: true, dogs: this.props.list });
  }

  directSort() {
    const newDogs = this.state.dogs;
    newDogs.sort(App.compareDirectDogs);
    this.setState({ dogs: newDogs });
  }

  reverseSort() {
    const newDogs = this.state.dogs;
    newDogs.sort(App.compareReverseDogs);
    this.setState({ dogs: newDogs });
  }

  render() {
    console.log('dogs', this.state.dogs);
    return (
      <div>
        <h1>test</h1>
        <Button bsStyle="success" bsSize="large" onClick={() => this.handleShowAllClick()}>
          show all
        </Button>
        {this.state.display ? (
          <div>
            <Button bsStyle="info" bsSize="large" onClick={() => this.directSort()}>
              sort in direct order
            </Button>
            <Button bsStyle="info" bsSize="large" onClick={() => this.reverseSort()}>
              sort in reverse order
            </Button>
            <input placeholder="search" />
          </div>
        ) : null}
        <ListGroup>
          {this.state.display ? (
            <div>{this.state.dogs.map(dog => <Dog breed={dog.breed} name={dog.name} />)}</div>
          ) : null}
        </ListGroup>
      </div>
    );
  }
}

App.propTypes = {
  fetchList: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.obj),
};

App.defaultProps = {
  fetchList: list => ({ type: 'FETCH_LIST', list }),
  list: [],
};

const mapStateToProps = state => ({ list: state.list });

export default connect(mapStateToProps, actions)(App);
