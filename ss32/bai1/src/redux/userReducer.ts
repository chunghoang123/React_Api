import { User } from "../types/user";

const initialState: User = {
  id: 1,
  userName: "Nguyen Van A",
  gender: "Male",
  dateBirth: "2000-01-01",
  address: "Hà Nội",
};

interface UpdateUserAction {
  type: "UPDATE_USER";
  payload: Partial<User>; // Cho phép update 1 phần User
}

type UserAction = UpdateUserAction; // sau này có thể mở rộng thêm nhiều action

// Reducer
export const userReducer = (
  state: User = initialState,
  action: UserAction
): User => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
