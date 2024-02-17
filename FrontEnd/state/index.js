import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to fetch user IDs from the database
export const fetchUserIds = createAsyncThunk(
  'global/fetchUserIds',
  async () => {
    // Replace this with your actual API call to fetch user IDs from the database
    const response = await fetch('/api/users');
    const data = await response.json();
    // Assuming data is an array of user objects with ID properties
    return data.map(user => user.id);
  }
);

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239c72c00017f",
  userIds: [], // Initial state for storing user IDs
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserIds.fulfilled, (state, action) => {
        state.userIds = action.payload; // Update userIds state with fetched user IDs
      })
      .addCase(fetchUserIds.rejected, (state, action) => {
        // Handle rejected state if necessary
      });
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
