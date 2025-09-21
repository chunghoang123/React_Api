import { useSelector } from "react-redux"
import type { RootState } from "../store/store"


export default function Price() {
    const data=useSelector((e:RootState)=>e.foodlist);
  return (
    <div className="flex justify-between items-center">
       <div >There are {data.length} items in your shopping cart.</div>
       <div className="text-red-500">{data.reduce((a,b)=>a+(b.price*b.quantity),0)}USD</div>
    </div>
  )
}
