import { call, put, takeEvery } from "redux-saga/effects";
import {
  forecastFetch,
  forecastFetchFailure,
  forecastFetchSuccess,
} from "./forecastSlice";

function* getForecastFetch({ payload: city }) {
  try {
    const response = yield call(() =>
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=5f2b34c6c09e4fd981522241242705&q=${city}&days=3&aqi=no&alerts=no`
      )
    );
    const data = yield response.json();
    yield put(forecastFetchSuccess(data));
  } catch (e) {
    console.log('error')
    yield put(forecastFetchFailure(e));
  }
}

function* forecastSaga() {
  yield takeEvery(forecastFetch, getForecastFetch);
}

export default forecastSaga;
