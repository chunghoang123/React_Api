export type food = {
  id: number;
  name: string;
  title?: string;
  status: boolean;
  quantity: number;
  price: number;
  image?:string;
};
export type Action =
  | { type: "ADD", payload: food }
  | {
      type: "UPDATE",
      payload: { id: number; quantity: number; price: number; };
    }
  | { type: "DELETE", payload: { id: number } };
