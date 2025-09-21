import { Button, Card } from "antd";
import type { food } from "../types/interface";
import { useDispatch } from "react-redux";
type prop = {
  foods: food[];
  // reset:(id:number)=>void
};
export default function ListProduct({ foods }: prop) {
  const dispath = useDispatch();
  const getFoods = (id: number) => {
    const foodstemp = foods.find((d) => d.id === id);
    if (!foodstemp) return;

    if (foodstemp.quantity > 0) {
      const cart: food[] = JSON.parse(localStorage.getItem("foods") || "[]");
      const exists = cart.find((item) => item.id === id);

      let updatedCart: food[];

      if (exists) {
        updatedCart = cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        dispath({
          type: "UPDATE",
          payload: {
            ...exists,
            quantity: exists.quantity + 1,
          },
        });
      } else {
        const newfood: food = { ...foodstemp, quantity: 1 };
        updatedCart = [...cart, newfood];
        dispath({ type: "ADD", payload: newfood });
      }

      localStorage.setItem("foods", JSON.stringify(updatedCart));
      alert("Thêm vào giỏ hàng thành công");
    } else {
      alert("Hết hàng");
    }
  };

  return (
    <Card
      title="List Products"
      className="shadow-lg"
      headStyle={{
        backgroundColor: "#1976d2",
        color: "white",
        fontWeight: "bold",
      }}
      bodyStyle={{
        padding: "16px",
      }}
      style={{
        border: "1px solid #1976d2",
        borderRadius: "8px",
        overflow: "hidden",
        width: "800px",
      }}
    >
      {foods.map((e) => (
        <div key={e.id} className="flex mb-3 mt-3">
          <img
            src={e.image}
            alt=""
            className="rounded-lg shadow-lg"
            style={{ width: "80px", height: "80px", marginRight: "16px" }}
          />
          <div>
            <div className="text-[20px]">{e.name}</div>
            <div>{e.title}</div>
          </div>
          <div>
            {e.quantity == 0 ? (
              <></>
            ) : (
              <div className="text-center border-solid border-gay-300 border-1 mb-1 rounded-lg shadow-lg">
                {e.quantity}
              </div>
            )}
            <Button danger onClick={() => getFoods(e.id)}>
              {e.price.toLocaleString()} USD
            </Button>
          </div>
        </div>
      ))}
    </Card>
  );
}
