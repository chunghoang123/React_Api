import { createSlice } from "@reduxjs/toolkit";
const initialState = "expanded"
const menubarReducer = createSlice({
    name:"menubar",
    initialState,
    reducers :{
        toggleMenubar : (state)=>{
            return state = state ==="expanded" ? "shrunk" : "expanded"
        }
    }
})
export default menubarReducer.reducer
export const {toggleMenubar} = menubarReducer.actions