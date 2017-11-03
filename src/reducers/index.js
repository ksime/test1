const compareDirectDogs = (a, b) => {
  if (a.breed > b.breed) {
    return 1;
  }
  return -1;
};

const compareReverseDogs = (a, b) => {
  if (a.breed > b.breed) {
    return -1;
  }
  return 1;
};

export default (state, action) => {
  if (action.type === 'FETCH_LIST') {
    const newState = Object.assign({}, state, { list: action.list });
    return newState;
  }
  if (action.type === 'DIRECT_SORT') {
    const newList = state.list;
    console.log('oldList', state.list);
    newList.sort(compareDirectDogs);
    console.log('newList', newList);
    const newState = Object.assign({}, state, { list: newList });
    return newState;
  }
  if (action.type === 'REVERSE_SORT') {
    const newList = state.list;
    console.log('oldList', state.list);
    newList.sort(compareReverseDogs);
    console.log('newList', newList);
    const newState = Object.assign({}, state, { list: newList });
    return newState;
  }
  return state;
};
