// slice/vehicleSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://fugitive-capture-game-ute4.onrender.com'; // Define base URL

export const getVehicles = createAsyncThunk(
    'vehicles/getVehicles',
    async () => {
      try {
        const response = await axios.get(`${BASE_URL}/vehicles`); // Update URL
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch vehicles');
      }
    }
  );
  
export const fetchVehicle = createAsyncThunk(
    'vehicles/fetchVehicle',
    async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/vehicles/${id}`); // Update URL
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch vehicle');
      }
    }
  );

export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (vehicleData) => {
    try {
      const response = await axios.post(`${BASE_URL}/vehicles`, vehicleData); // Update URL
      return response.data;
    } catch (error) {
      throw new Error('Failed to add vehicle');
    }
  }
);

export const updateVehicle = createAsyncThunk(
    'vehicles/updateVehicle',
    async ({ id, vehicleData }) => {
      try {
        const response = await axios.put(`${BASE_URL}/vehicles/${id}`, vehicleData); // Update URL
        return response.data;
      } catch (error) {
        throw new Error('Failed to update vehicle');
      }
    }
  );

export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async (id) => {
    try {
      await axios.delete(`${BASE_URL}/vehicles/${id}`); // Update URL
      return id;
    } catch (error) {
      throw new Error('Failed to delete vehicle');
    }
  }
);

const initialState = {
  vehicles: [],
  error: null,
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload;
        state.error = null;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.vehicles.push(action.payload);
        state.error = null;
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const updatedVehicleIndex = state.vehicles.findIndex(vehicle => vehicle.id === action.payload.id);
        if (updatedVehicleIndex !== -1) {
          state.vehicles[updatedVehicleIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setError } = vehicleSlice.actions;
export default vehicleSlice.reducer;
