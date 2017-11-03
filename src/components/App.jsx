import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dog from './Dog';
import * as actions from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      dogs: '',
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
    const { list } = this.props;
    console.log('list', list);
    const dogs = list.map(dog => <Dog breed={dog.breed} name={dog.name} />);
    this.setState({ display: true, dogs });
  }

  render() {
    console.log(this.props.list);
    return (
      <div>
        <h1>test</h1>
        <Button bsStyle="success" bsSize="large" onClick={() => this.handleShowAllClick()}>
          show all
        </Button>
        {this.state.display ? (
          <div>
            <Button bsStyle="info" bsSize="large" onClick={() => this.props.directSort()}>
              sort in direct order
            </Button>
            <Button bsStyle="info" bsSize="large" onClick={() => this.props.reverseSort()}>
              sort in reverse order
            </Button>
          </div>
        ) : null}
        <ListGroup>{this.state.display ? <div>{this.state.dogs}</div> : null}</ListGroup>
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
