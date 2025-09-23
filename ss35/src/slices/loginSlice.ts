import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type Account = { email: string; password: string; isloggedIn?: boolean };
const initialState: Account = {
  email: "",
  password: "",
  isloggedIn: false,
};
const loginSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Account>) => {
      return {
        ...action.payload,
        isloggedIn: true
      }
    },
  },
});
export default loginSlice.reducer;
export const { save } = loginSlice.actions;
