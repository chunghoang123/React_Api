import { User } from "../types/user";

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
    {
      id: 1,
      userName: "Nguyen Van A",
      gender: "Male",
      dateBirth: "2000-01-01",
      address: "Hà Nội",
    },
    {
      id: 2,
      userName: "Tran Thi B",
      gender: "Female",
      dateBirth: "2001-05-10",
      address: "Đà Nẵng",
    },
  ],
};

// Action types
const ADD_USER = "ADD_USER";

// Action interface
interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

// Union type cho tất cả action
type UserAction = AddUserAction;

// Reducer
const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

export default userReducer;

// Action creator
export const addUser = (user: User): AddUserAction => ({
  type: ADD_USER,
  payload: user,
});
