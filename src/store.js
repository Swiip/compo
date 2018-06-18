export const store = {};

export const createStore = (reducer) => {
  let state = {};
  const subscribers = [];

  store.getState = () => state;
  store.subscribe = listener => subscribers.push(listener);
  store.dispatch = (action) => {
    state = reducer(state, action);
    console.log('dispatch', 'action :', action, 'new state :', state);
    subscribers.forEach(subscriber => subscriber());
  };
};
