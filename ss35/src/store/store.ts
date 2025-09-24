import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterReducer";
import menubarReducer from "../slices/menubarReducer";
import languageSlice from "../slices/languageSlice";
import randomReducer from "../slices/randomReducer";
import themeReducer from "../slices/themeReducer";
import gridReducer from "../slices/gridReducer";
import favoriteSlice from "../slices/favoriteSlice";
import loginSlice from "../slices/loginSlice";

const store = configureStore({
  reducer: {
    count: counterReducer,
    random: randomReducer,
    // theme: themeReducer,
    theme:themeReducer,
    grid: gridReducer,
    menubar: menubarReducer,
    language: languageSlice,
    fav: favoriteSlice,
    loginForm : loginSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
