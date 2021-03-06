// Import Action Types
import * as actions from '../actions/types';

// Initialize State
const initialState = {
  auth_token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  hashLoading: false,
  hashName: null,
  hashValid: null,
  user: null,
  errors: {},
};

// Reducer Function (switches on action type)
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.HASH_LOADING:
      return {
        ...state,
        hashLoading: true,
      };
    case actions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.auth_token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        errors: {},
      };
    case actions.LOGOUT_SUCCESS:
    case actions.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        auth_token: null,
        user: null,
        hashName: null,
        hashValid: null,
        isAuthenticated: false,
        isLoading: false,
        errors: {},
      };
    case actions.LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        auth_token: null,
        user: null,
        hashName: null,
        hashValid: null,
        isAuthenticated: false,
        isLoading: false,
        errors: action.payload,
      };
    case actions.HASH_VALID:
      return {
        ...state,
        hashValid: true,
        hashName: action.payload,
        hashLoading: false,
      };
    case actions.HASH_INVALID:
      return {
        ...state,
        hashValid: false,
        hashLoading: false,
        errors: action.payload,
      };
    case actions.CLEAR_HASH:
      return {
        ...state,
        hashValid: null,
        hashLoading: false,
        hashName: null,
      };
    default:
      return state;
  }
}
