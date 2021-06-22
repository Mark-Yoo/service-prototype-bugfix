import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailItem } from '../../modules/getOrder';
import { Item } from '../Mypage/styles';
import { ItemDetail } from './styles';

const MypageDetail = ({ match, history }) => {
  const { itemDetail } = useSelector((state) => state.getOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetailItem(+match.params.id));
  }, [dispatch, match]);

  useEffect(() => {
    console.log(match);
  }, [match]);

  return (
    <>
      {itemDetail && (
        <>
          <Item>
            <div>ID: {itemDetail.id}</div>
            <div>제품명: {itemDetail.itemName}</div>
          </Item>
          <ItemDetail></ItemDetail>
        </>
      )}
    </>
  );
};

export default memo(MypageDetail);
