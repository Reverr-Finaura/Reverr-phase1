import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
 testing:"this is testing data"
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.testing = action.payload;
    },
  },
});
export const {setTest} =
appSlice.actions;

export default appSlice.reducer;
