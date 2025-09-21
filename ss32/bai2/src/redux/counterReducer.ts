export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

interface IncrementAction {
  type: typeof INCREMENT;
  payload: number;
}

interface DecrementAction {
  type: typeof DECREMENT;
  payload: number;
}

type CounterAction = IncrementAction | DecrementAction;

const counterReducer = (
  state = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + action.payload };
    case DECREMENT:
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

export default counterReducer;

export const increment = (value: number): IncrementAction => ({
  type: INCREMENT,
  payload: value,
});

export const decrement = (value: number): DecrementAction => ({
  type: DECREMENT,
  payload: value,
});
