import { handleActions } from 'redux-actions';
import { signUp, signIn } from '../lib/api';

const initialState = {
  loading: {
    GET_USER: false,
    DELETE_USER: false,
  },
  token: null,
  statusCode: null,
};

const SIGN_UP_INFO = 'postInfo/SIGN_UP_INFO';
const SIGN_UP_INFO_SUCCESS = 'postInfo/SIGN_UP_INFO_SUCCESS';
const SIGN_UP_INFO_FAILURE = 'postInfo/SIGN_UP_INFO_FAILURE';

const SIGN_IN_INFO = 'postInfo/SIGN_IN_INFO';
const SIGN_IN_INFO_SUCCESS = 'postInfo/SIGN_IN_INFO_SUCCESS';
const SIGN_IN_INFO_FAILURE = 'postInfo/SIGN_IN_INFO_FAILURE';

const SIGN_OUT_INFO = 'postInfo/SIGN_OUT_INFO';
const SIGN_OUT_INFO_SUCCESS = 'postInfo/SIGN_OUT_INFO_SUCCESS';
const SIGN_OUT_INFO_FAILURE = 'postInfo/SIGN_OUT_INFO_FAILURE';

export const getTokenSignUp = (payload) => async (dispatch) => {
  dispatch({ type: SIGN_UP_INFO });
  try {
    const response = await signUp(payload);
    dispatch({
      type: SIGN_UP_INFO_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: SIGN_UP_INFO_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const getTokenSignIn = (payload) => async (dispatch) => {
  dispatch({ type: SIGN_IN_INFO });
  try {
    const response = await signIn(payload);
    dispatch({
      type: SIGN_IN_INFO_SUCCESS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: SIGN_IN_INFO_FAILURE,
      payload: e.response,
      error: true,
    });
    throw e;
  }
};

export const deleteTokenSignOut = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT_INFO });
  try {
    dispatch({
      type: SIGN_OUT_INFO_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: SIGN_OUT_INFO_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

const postInfo = handleActions(
  {
    [SIGN_UP_INFO]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USER: true,
      },
    }),
    [SIGN_UP_INFO_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USER: false,
      },
      token: action.payload,
    }),
    [SIGN_UP_INFO_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USER: false,
      },
    }),
    [SIGN_IN_INFO]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USER: true,
      },
    }),
    [SIGN_IN_INFO_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USER: false,
      },
      token: action.payload.data,
      statusCode: null,
    }),
    [SIGN_IN_INFO_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USER: false,
      },
      statusCode: action.payload.status,
    }),
    [SIGN_OUT_INFO]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_USER: true,
      },
    }),
    [SIGN_OUT_INFO_SUCCESS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_USER: false,
      },
      token: null,
    }),
    [SIGN_OUT_INFO_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_USER: false,
      },
    }),
  },
  initialState,
);

export default postInfo;
