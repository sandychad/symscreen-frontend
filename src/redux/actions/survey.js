// Action Types
import * as actions from './types';

// Import pre-configured API
import api from '../../utils/api';

// GET QUESTIONS
export const getQuestions = () => async (dispatch) => {
  try {
    // Send Message: QUESTIONS_LOADING
    dispatch({
      type: actions.QUESTIONS_LOADING,
    });

    // Send GET request to /questions endpoint
    const res = await api.get('/questions');

    // Send Message: QUESTIONS_LOADED
    dispatch({
      type: actions.QUESTIONS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// SET PERSON
export const setPerson = (person) => (dispatch) => {
  // SET PERSON
  dispatch({
    type: actions.SET_PERSON,
    payload: person,
  });
};
