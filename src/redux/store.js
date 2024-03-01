import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducer/authReducer';
import cartReducer from './reducer/cartReducer';
import productsReducer from './reducer/productsReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer
});

// const store = createStore(rootReducer);

// export default store;
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = createStore(
  persistedReducer,
  applyMiddleware(/* any middleware you want to use */)
);

// Create persistor
const persistor = persistStore(store);

export { store, persistor };