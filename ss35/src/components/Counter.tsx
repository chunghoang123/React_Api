import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { decrease, increase, reset } from "../slices/counterReducer";

export const Counter = () => {
    const {value} = useAppSelector((state )=> state.count)
    const dispatch = useAppDispatch()
  return (
    <div>
      <h3>Count: {value}</h3>
      <div style={{display:"flex", flexDirection:"row"}}>
        <button onClick={()=>dispatch(increase())}>Increase</button>
        <button onClick={()=>dispatch(decrease())}>Decrease</button>
        <button onClick={()=>dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
};
