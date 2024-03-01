export const LOGIN = 'LOGIN'; // ACTION TYPE
export const LOGOUT = 'LOGOUT'; // ACTION TYPE

const initialState = {
  user: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };

    default:
      return state; //must be like this so it can  presist the reducers
  }
}
