import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Button } from "antd";
import type { food } from "../types/interface";

type prop = {
  resetitem: (id: number) => void;
};

export default function ItemCart({ resetitem }: prop) {
  const data = useSelector((e: RootState) => e.foodlist);
  const foods: food[] = JSON.parse(localStorage.getItem("setfoods") || "[]");
  const dispatch = useDispatch();

  const ChangeQuantity = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const food = foods.find((e) => e.id === id);
    if (!food) return;
    const temp = Number(e.target.value) || 0;
    dispatch({ type: "UPDATE", payload: { id: id, quantity: temp } });
  };
  const update = (id: number) => {
    const product = data.find((e) => e.id === id);
    const food = foods.find((e) => e.id === id);

    if (!product || !food) return;

    if (product.quantity <= 0) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }

    if (product.quantity > food.quantity) {
      alert("Số lượng vượt quá tồn kho!");
      return;
    }

    dispatch({
      type: "UPDATE",
      payload: { id: id, quantity: product.quantity },
    });
    resetitem(id);
    alert("cap nhat thanh cong");
  };

  return (
    <>
      {data.map((e) => (
        <tr key={e.id} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-2 border text-center">{e.id}</td>
          <td className="px-4 py-2 border">{e.name}</td>
          <td className="px-4 py-2 border text-right">${e.price}</td>
          <td className="px-4 py-2 border text-center">
            <input
              type="number"
              value={e.quantity}
              onChange={(ev) => ChangeQuantity(e.id, ev)}
              className="w-16 text-center border rounded"
            />
          </td>
          <td className="px-4 py-2 border space-x-2 text-center">
            <Button
              type="primary"
              className="!bg-blue-500 hover:!bg-blue-600"
              onClick={() => update(e.id)}
            >
              UPDATE
            </Button>
            <Button
              danger
              className="!bg-red-500 hover:!bg-red-600"
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
                  dispatch({ type: "DELETE", payload: { id: e.id } });
                }
              }}
            >
              DELETE
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
