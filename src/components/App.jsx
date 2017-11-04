import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import H1 from './H1';
import Ul from './List';
import Input from './Input';
import Wrapper from './Wrapper';
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
      dogs: [],
      filteredDogs: [],
      value: '',
      displayFilter: false,
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

  handleInputChange(event) {
    const inpVal = event.target.value;
    if (inpVal === '') {
      this.setState({ value: inpVal, displayFilter: false, filteredDogs: [] });
    } else {
      const filteredDogs = this.state.dogs.filter((dog) => {
        const re = new RegExp(inpVal);
        if (re.test(dog.breed)) {
          return dog;
        }
        return null;
      });
      this.setState({ value: inpVal, displayFilter: true, filteredDogs });
    }
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
    return (
      <div>
        <H1>Dogs breeds</H1>
        <Wrapper>
          <Button onClick={() => this.handleShowAllClick()}>
            show all breeds
          </Button>
        </Wrapper>
        <Wrapper>
          {this.state.display ? (
            <div>
              <Button onClick={() => this.directSort()}>
                sort in direct order
              </Button>
              <Button onClick={() => this.reverseSort()}>
                sort in reverse order
              </Button>
              <Input
                placeholder="search"
                value={this.state.value}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            ) : null}
        </Wrapper>
        {this.state.display && !this.state.displayFilter ? (
          <Ul>{this.state.dogs.map(dog => <Dog breed={dog.breed} name={dog.name} />)}</Ul>
        ) : null}
        {this.state.display && this.state.displayFilter ? (
          <Ul>
            {this.state.filteredDogs.map(dog => <Dog breed={dog.breed} name={dog.name} />)}
          </Ul>
        ) : null}
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
