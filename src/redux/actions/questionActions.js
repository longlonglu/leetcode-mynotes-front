import { QUESTION_LOAD_ALL, SHOW_ALL } from "../constants/questionConstants";
import customAxios from "../../hooks";

export const loadAllQuestion = () => {
  const axios = customAxios();
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/question");
      const doneQuestions = data.filter((row) => row.frequency !== 0);
      dispatch({
        type: QUESTION_LOAD_ALL,
        payload: {
          allQuestions: data,
          doneQuestions,
          showAll: true,
        },
      });
    } catch (error) {
      dispatch({
        type: QUESTION_LOAD_ALL,
      });
    }
  };
};

export const showAll = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SHOW_ALL,
        payload: {
          showAll: payload,
        },
      });
    } catch (error) {
      dispatch({
        type: QUESTION_LOAD_ALL,
      });
    }
  };
};
