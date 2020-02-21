import React from 'react';

//REDUX SETUP
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reducer from './src/reducers';
import Routes from './src/routes'
import firebase from 'react-native-firebase';
console.disableYellowBox = true;
/*
var config = {

};
*/
firebase.initializeApp(config);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  timeout: 10000
};
const persistedReducer = persistReducer(persistConfig, reducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
let persistor = persistStore(store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
