// Import Action Types
import * as actions from '../actions/types';

// Initialize State
const initialState = {
  questions: [],
  person: {},
  isLoading: false,
  decision: {},
};

// Reducer Function (switches on action type)
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.QUESTIONS_LOADED:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
      };
    case actions.CLEAR_QUESTIONS:
      return {
        ...state,
        questions: [],
      };
    case actions.SET_PERSON:
      return {
        ...state,
        person: action.payload,
      };
    case actions.CLEAR_PERSON:
      return {
        ...state,
        person: {},
      };
    case actions.SUBMIT_FORM:
      return {
        ...state,
        isLoading: true,
      };
    case actions.DECISION_LOADED:
      return {
        ...state,
        decision: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
