import { Card } from "antd";
import ItemCart from "./ItemCart";
import Price from "./Price";
type prop={
  reset:(id:number)=>void
}
export default function Cart({reset}:prop) {
  return (
    <Card
      title="Cart"
      styles={{
        header: {
          backgroundColor: "#f2dede",
          color: "red",
          fontWeight: "bold",
        },
      }}
      style={{
        border: "1px solid #f2dede",
        borderRadius: "8px",
        minHeight: "300px",
        width: 700,
      }}
      className="shadow-lg"
    >
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">NAME</th>
            <th className="px-4 py-2 border">PRICE</th>
            <th className="px-4 py-2 border">QUANTITY</th>
            <th className="px-4 py-2 border">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <ItemCart resetitem={reset}/>
        </tbody>
      </table>
      <footer>
        <Price/>
      </footer>
    </Card>
  );
}
