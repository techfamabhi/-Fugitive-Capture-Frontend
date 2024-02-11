import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching cities
export const getCities = createAsyncThunk(
  'cities/getCities',
  async () => {
    try {
      const response = await axios.get('https://fugitive-capture-game-ute4.onrender.com/cities/cities');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cities');
    }
  }      
);

// Async thunk for adding a new city
export const addCity = createAsyncThunk(
  'cities/addCity',
  async (cityData) => {
    try {
      const response = await axios.post('https://fugitive-capture-game-ute4.onrender.com/cities/cities', cityData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add city');
    }
  }
);

// Async thunk for updating a city
export const updateCity = createAsyncThunk(
    'cities/updateCity',
    async ({ id, cityData }) => {
      try {
        const response = await axios.put(`https://fugitive-capture-game-ute4.onrender.com/cities/cities/${id}`, cityData);
        return response.data;
      } catch (error) {
        throw new Error('Failed to update city');
      }
    }
  );
  

// Async thunk for deleting a city
export const deleteCity = createAsyncThunk(
  'cities/deleteCity',
  async (id) => {
    try {
      await axios.delete(`https://fugitive-capture-game-ute4.onrender.com/cities/cities/${id}`);
      return id;
    } catch (error) {
      throw new Error('Failed to delete city');
    }
  }
);

// Initial state
const initialState = {
  cities: [],
  error: null,
};

// City slice
const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.error = null;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
        state.error = null;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        const updatedCityIndex = state.cities.findIndex(city => city.id === action.payload.id);
        if (updatedCityIndex !== -1) {
          state.cities[updatedCityIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter(city => city.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { setError } = citySlice.actions;
export default citySlice.reducer;
