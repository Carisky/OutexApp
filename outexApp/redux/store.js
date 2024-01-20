// store.js
import { createStore, combineReducers } from 'redux'; // Обратите внимание на эту строку
import userReducer from './reducer';

const rootReducer = combineReducers({
  userReducer,
  // Добавьте другие редюсеры здесь, если необходимо
});

const store = createStore(rootReducer);

export default store;
