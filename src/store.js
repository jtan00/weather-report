import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import forecastSlice from "./forecastSlice";
import forecastSaga from "./forecastSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    forecast: forecastSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(forecastSaga)

export default store;
