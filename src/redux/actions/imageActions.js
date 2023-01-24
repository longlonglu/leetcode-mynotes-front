import { STORE_IMAGE } from "../constants/imageConstants";

export const storeImage = (imageList) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: STORE_IMAGE,
        images: imageList,
      });
    } catch (error) {}
  };
};
