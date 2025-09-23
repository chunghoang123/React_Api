import { createSlice } from "@reduxjs/toolkit";
const initialState: {value: number} = {
    value : 0
}
const counterReducer = createSlice({
    name : "counter",
    initialState,
    reducers: {
        increase : (state) =>{
            state.value += 1
        },
        decrease : (state) =>{
            state.value -= 1
        },
        reset : (state) =>{
            state.value = 0
        },
    }
})

export default  counterReducer.reducer
export const {increase, decrease,reset} = counterReducer.actions

