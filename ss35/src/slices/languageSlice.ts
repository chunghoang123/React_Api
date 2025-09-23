import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
const initialState: {
  viet: string;
  eng: string;
  mode: string;
} = {
  viet: "Hoc vien Rikkei",
  eng: "Rikkei Academy",
  mode: "viet",
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      return action.payload === "viet"
        ? { ...state, mode: "viet" }
        : { ...state, mode: "eng" };
    },
  },
});
export default languageSlice.reducer
export const {changeLanguage} = languageSlice.actions
