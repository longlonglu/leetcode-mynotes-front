import { QUESTION_LOAD_ALL, SHOW_ALL } from "../constants/questionConstants";

const reducer = (state = null, action) => {
  switch (action.type) {
    case QUESTION_LOAD_ALL:
      return action.payload;
    case SHOW_ALL:
      return {
        ...state,
        showAll: action.payload.showAll,
      };
    default:
      if (state) {
        return {
          ...state,
        };
      } else {
        return { allQuestions: [], doneQuestions: [], showAll: true };
      }
  }
};

export default reducer;
