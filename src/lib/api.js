import axios from 'axios';

const api = 'http://106.10.53.116:8099';

export const signUp = ({ params }) => axios.post(api + '/sign-up', params);

export const signIn = (params) => axios.post(api + '/login', params);

export const getOrderList = (params) =>
  axios.get(api + `/order?page=${params}`);

export const getOrderDetail = (params) => axios.get(api + `/order/${params}`);
