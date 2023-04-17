import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { goalReducer } from './goal';
import goalNotesReducer from './goalNote';
import badgesReducer from './badge';
import { taskReducer } from './task';
import taskNotesReducer from './taskNote';
import searchReducer from './search';


const rootReducer = combineReducers({
  session,
  goals: goalReducer,
  goalNote: goalNotesReducer,
  badges: badgesReducer,
  tasks: taskReducer,
  taskNote: taskNotesReducer,
  search: searchReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
