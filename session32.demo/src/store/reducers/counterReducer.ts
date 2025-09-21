
const initialState = 10;

type ActionType = {
    type: string;
    payload: unknown;
};



export const counterReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "INCREASE":
            // cập nhật lại state = state + 1
            return state + 1

        case "DECREASE":
            // cập nhật lại state = state - 1
            return state - 1

        default:
            return state

    }

}