import { createSlice } from "@reduxjs/toolkit";
const initialState = "List"
const gridReducer = createSlice({
    name: "grid",
    initialState,
    reducers :{
        toggleGrid : (state) =>{
            return state = state === "List" ? "Grid" :"List"
        }
    }
})
export default gridReducer.reducer
export const {toggleGrid} = gridReducer.actions