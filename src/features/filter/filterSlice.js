const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  status: "All",
  colors: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusChange: (state, action) => {
      state.status = action.payload;
    },
    colorChange: (state, action) => {
      if (state.colors.includes(action.payload)) {
        state.colors = state.colors.filter((col) => col !== action.payload);
      } else {
        state.colors.push(action.payload);
      }
    },
  },
});

export default filterSlice.reducer;
export const { statusChange, colorChange } = filterSlice.actions;
