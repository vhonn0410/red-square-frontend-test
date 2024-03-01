export const MODIFYPRODUCTS = 'MODIFYPRODUCTS'; // ACTION TYPE
export const CLEARPRODUCTS = 'CLEARPRODUCTS'; // ACTION TYPE

const initialState = {
  products: {}
};
export default function (state = initialState, action) {
  console.log("RRRR", action, state)
  switch (action.type) {
    case MODIFYPRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case CLEARPRODUCTS:
      return {
        ...state,
        products: {},
      };

    default:
      return state; //must be like this so it can  presist the reducers
  }
}
