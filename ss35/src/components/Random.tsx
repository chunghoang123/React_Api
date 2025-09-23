import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/customHooks'
import { randomize } from '../slices/randomReducer'

export const Random = () => {
    const {values} = useAppSelector((state)=>state.random)
    const dispatch = useAppDispatch()
  return (
    <div>
        <h3>List random: {JSON.stringify(values)}</h3>
        <button onClick={()=>dispatch(randomize())}>Random</button>
    </div>
  )
}
