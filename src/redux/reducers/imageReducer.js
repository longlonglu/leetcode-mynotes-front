import { STORE_IMAGE } from "../constants/imageConstants";

const reducer = (state = [], action) => {
  switch (action.type) {
    case STORE_IMAGE:
      return action.images;
    default:
      if (state.length === 0) {
        return [];
      } else {
        return [...state];
      }
  }
};

export default reducer;
