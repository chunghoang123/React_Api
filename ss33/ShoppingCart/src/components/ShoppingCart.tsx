import { useEffect, useState } from "react";
import Cart from "./Cart";
import ListProduct from "./ListProduct";
import type { food } from "../types/interface";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


export default function ShoppingCart() {
  const list=useSelector((e:RootState)=>e.foodlist);
  const food: food[] = [
  {
    id: 1,
    name: "Pizza",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    status: false,
    image: "https://vietair.com.vn/Media/Images/pizza-ha-noi-o-dau-ngon-zpizza.jpg",
    quantity: 0,
    price: 30,
  },
  {
    id: 2,
    name: "Hamburger",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    status: true,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2d0Eu6YjNGPsvlTECvThwUJ4il8yZFztdoQ&s",
    quantity: 4,
    price: 15,
  },
  {
    id: 3,
    name: "Bread",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    status: true,
    image:"https://media.vov.vn/sites/default/files/styles/large/public/2022-05/vuong.jpg-602x470.png.jpg",
    quantity: 1,
    price: 20,
  },
  {
    id: 4,
    name: "Cake",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    status: true,
    image:"https://kreamz.in/wp-content/uploads/2024/02/chocolate-truffle-cake.webp",
    quantity: 1,
    price: 10,
  },
];
  const [foods,setfoods] = useState<food[]>(() => {
    const saved = localStorage.getItem("setfoods");
    return saved ? JSON.parse(saved) : food;
  });

  useEffect(() => {
    localStorage.setItem("setfoods", JSON.stringify(foods));
  }, [foods]);

  const reset=(id:number)=>{
        const foodreset=list.find(e=>e.id==id);
        if(!foodreset) return;
        setfoods(foods.map((e)=>e.id==id ? {...e,quantity:e.quantity-foodreset.quantity}:e));
  }
  return (
    <div className="flex gap-4">
        <ListProduct foods={foods} ></ListProduct>
        <Cart reset={reset}></Cart>
    </div>
  )
}
