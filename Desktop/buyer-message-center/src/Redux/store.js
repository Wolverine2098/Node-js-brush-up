import { createStore, applyMiddleware , compose} from 'redux'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'

export const PWAAppState = () => {
    return ({});
}

const promiseMiddleware = (store) => (next) => (action) => {
  if (typeof action !== "function") {
    return next(action);
  }

  return next(action);
};

let initialState = PWAAppState();

if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
    initialState = window.__INITIAL_STATE__;
  }

const composedEnhancer = compose(applyMiddleware(thunk))
export const store = createStore(rootReducer,initialState, applyMiddleware(promiseMiddleware, thunk)
);