import { handleActions } from 'redux-actions';
import { getOrderDetail, getOrderList } from '../lib/api';

const initialState = {
  loading: {
    GET_ORDER: false,
    GET_ORDER_DETAIL: false,
    DELETE_ORDER: false,
  },
  totalPages: null,
  currentPage: null,
  content: null,
  itemDetail: null,
};

const GET_ORDER = 'getOrder/GET_ORDER';
const GET_ORDER_SUCCESS = 'getOrder/GET_ORDER_SUCCESS';
const GET_ORDER_FAILURE = 'getOrder/GET_ORDER_FAILURE';

const GET_ORDER_DETAIL = 'getOrder/GET_ORDER_DETAIL';
const GET_ORDER_DETAIL_SUCCESS = 'getOrder/GET_ORDER_DETAIL_SUCCESS';
const GET_ORDER_DETAIL_FAILURE = 'getOrder/GET_ORDER_DETAIL_FAILURE';

const DELETE_ORDER = 'getOrder/DELETE_ORDER';
const DELETE_ORDER_SUCCESS = 'getOrder/DELETE_ORDER_SUCCESS';
const DELETE_ORDER_FAILURE = 'getOrder/DELETE_ORDER_FAILURE';

// 주문한 상품리스트를 get 해오기
export const getOrderItem = (payload) => async (dispatch) => {
  dispatch({ type: GET_ORDER });
  try {
    const response = await getOrderList(payload);
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ORDER_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

// 주문한 상품의 세부 내역을 get 해오기
export const getOrderDetailItem = (payload) => async (dispatch) => {
  dispatch({ type: GET_ORDER_DETAIL });
  try {
    const response = await getOrderDetail(payload);
    dispatch({
      type: GET_ORDER_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ORDER_DETAIL_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

// 로그아웃과 함께 상품 정보를 지우기
export const deleteOrderItem = () => async (dispatch) => {
  dispatch({ type: DELETE_ORDER });
  try {
    dispatch({
      type: DELETE_ORDER_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

const getOrder = handleActions(
  {
    [GET_ORDER]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ORDER: true,
      },
    }),
    [GET_ORDER_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ORDER: false,
      },
      totalPages: action.payload.totalPages,
      currentPage: action.payload.currentPage,
      content: action.payload.content,
    }),
    [GET_ORDER_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ORDER: false,
      },
    }),
    [GET_ORDER_DETAIL]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ORDER_DETAIL: true,
      },
    }),
    [GET_ORDER_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ORDER_DETAIL: false,
      },
      itemDetail: action.payload,
    }),
    [GET_ORDER_DETAIL_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_ORDER_DETAIL: false,
      },
    }),
    [DELETE_ORDER]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_ORDER: true,
      },
    }),
    [DELETE_ORDER_SUCCESS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_ORDER: false,
      },
      itemDetail: null,
      content: null,
      currentPage: null,
      totalPages: null,
    }),
    [DELETE_ORDER_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        DELETE_ORDER: false,
      },
    }),
  },
  initialState,
);

export default getOrder;
