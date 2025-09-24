// import { createSlice } from "@reduxjs/toolkit";
// const initialState  = "light"
// const themeReducer = createSlice({
//     name : "theme",
//     initialState,
//     reducers : {
//         toggle: (state)=>{
//            return state = state === "light"? "dark" :"light"
//         }
//     }
// })
// export default  themeReducer.reducer
// export const {toggle} = themeReducer.actions

import { createSlice } from "@reduxjs/toolkit";

const initialState = "light";
const themeReducer = createSlice({
    name:"theme",
    initialState,
    reducers :{
        toggle :(state)=>{
            return state = state ==="light"?"dark":"light"
        }
    }
})
export default themeReducer.reducer
export const {toggle} = themeReducer.actions    