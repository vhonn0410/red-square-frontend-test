export const MODIFYCART = 'MODIFYCART'; // ACTION TYPE
export const CLEARCART = 'CLEARCART'; // ACTION TYPE

const initialState = {
  cartItems: {}
};
export default function (state = initialState, action) {
  console.log("RRRR", action, state)
  switch (action.type) {
    case MODIFYCART:
      return {
        ...state,
        cartItems: { ...state?.cartItems, ...action.payload },
      };
    case CLEARCART:
      return {
        ...state,
        cartItems: {},
      };

    default:
      return state; //must be like this so it can  presist the reducers
  }
}
