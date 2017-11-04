export default (state, action) => {
  if (action.type === 'FETCH_LIST') {
    const newState = Object.assign({}, state, { list: action.list });
    return newState;
  }
  return state;
};
