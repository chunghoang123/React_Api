import { createSlice } from "@reduxjs/toolkit";
const initialState: {values: number[]} = {values: []} 
const randomReducer = createSlice({
   name : "random",
   initialState,
   reducers :{
        randomize : (state)=>{
            state.values.push(Math.floor(Math.random()*1000))
        }
   }
})
export default randomReducer.reducer
export const {randomize} = randomReducer.actions