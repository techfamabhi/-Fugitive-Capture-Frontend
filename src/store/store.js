import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../slice/citySlice';
import vehicleReducer from '../slice/vehicleSlice';

const store = configureStore({
  reducer: {
    cities: cityReducer,
    vehicle: vehicleReducer,

  },
});

export default store;
