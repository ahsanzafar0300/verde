import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    token: null,
    email: null,
    role: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    flushUser: (state) => {
      state.currentUser = {
        token: null,
        email: null,
        role: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, flushUser } = userSlice.actions;

export default userSlice.reducer;
