import { createSlice } from "@reduxjs/toolkit";

export const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    loading: false,
    cityName: null,
    temperature1: null,
    temperature2: null,
    temperature3: null,
    date1: null,
    date2: null,
    date3: null,
    
  },
  reducers: {
    forecastFetch: (state, { payload: city }) => {
      state.loading = true;
      state.cityName = "loading";
      state.temperature1 = "loading";
      state.temperature2 = "loading";
      state.temperature3 = "loading";
      state.date1 = "loading";
      state.date2 = "loading";
      state.date3 = "loading";
    },
    forecastFetchSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.cityName = action.payload.location.name;
      state.temperature1 = action.payload.forecast.forecastday[0].day.avgtemp_f;
      state.temperature2 = action.payload.forecast.forecastday[1].day.avgtemp_f;
      state.temperature3 = action.payload.forecast.forecastday[2].day.avgtemp_f;
      state.date1 = action.payload.forecast.forecastday[0].date;
      state.date2 = action.payload.forecast.forecastday[1].date;
      state.date3 = action.payload.forecast.forecastday[2].date;
    },
    forecastFetchFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { forecastFetch, forecastFetchSuccess, forecastFetchFailure } =
  forecastSlice.actions;

export default forecastSlice.reducer;
