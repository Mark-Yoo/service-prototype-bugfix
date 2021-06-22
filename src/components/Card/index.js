import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { ItemCard, ItemImg, ItemOrderBtn } from './styles';

const Card = ({ token }) => {
  const onClickPurchase = useCallback(() => {
    if (token) alert('구매가 완료되었습니다!');
    else alert('로그인이 필요합니다!');
  }, [token]);

  return (
    <>
      <ItemCard>
        <ItemImg alt="project-logo" />
        <ItemOrderBtn onClick={onClickPurchase}>
          <Link
            to="/purchased"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            구매하기
          </Link>
        </ItemOrderBtn>
      </ItemCard>
    </>
  );
};

export default memo(Card);
