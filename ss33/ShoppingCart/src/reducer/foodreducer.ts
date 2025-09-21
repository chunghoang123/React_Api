
import { initialState } from "../store/store";
import type { Action, food } from "../types/interface";

export const foodreducer=(state:food[]=initialState,action:Action):food[]=>{
    switch(action.type){
        case "ADD":
            return [...state,action.payload];
        case"DELETE":
            return state.filter(e=>e.id!==action.payload.id);
        case "UPDATE":
            return state.map((e)=>e.id==action.payload.id ? {...e,quantity:action.payload.quantity}:e);
        default:
            return state
    }
}