import { configureStore, Tuple } from '@reduxjs/toolkit'
import reducer from './reducers/reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
// ==============================|| REDUX - MAIN STORE ||============================== //
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  devTools: true,
  middleware: () => new Tuple(sagaMiddleware, logger),//(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
sagaMiddleware.run(rootSaga)
export { store };
