import React, { useEffect, useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderItem } from '../../modules/getOrder';
import {
  ItemWrapper,
  Item,
  PageBtn,
  PageBtnWrapper,
  MypageWrapper,
} from './styles';

const Mypage = () => {
  const [page, setPage] = useState(0);
  const { totalPages, content } = useSelector((state) => state.getOrder);

  const dispatch = useDispatch();

  // 현재 페이지는 기본적으로 page 변수가 가진 숫자를 따라간다. 이 숫자는 각 버튼을 누를 때마다 숫자의 index를 받아 page에 새로 할당하는 방식으로 작성됨.
  const onClickChangePage = useCallback((index) => {
    setPage(index);
  }, []);

  useEffect(() => {
    dispatch(getOrderItem(page));
  }, [dispatch, page]);

  // useEffect(() => {
  //   console.log(totalPages);
  //   console.log(currentPage);
  //   console.log(content);
  // }, [content, totalPages, currentPage]);

  return (
    <MypageWrapper>
      <ItemWrapper>
        {content?.map(({ id, itemName }) => (
          <Link
            to={`/mypage/order/${id}`}
            key={id}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Item>
              <div>ID: {id}</div>
              <div>제품명: {itemName}</div>
            </Item>
          </Link>
        ))}
        <PageBtnWrapper>
          {/* 전달받는 전체 페이지 수가 숫자형으로 전달되는 상황에서 for문을 이용하여 임의의 배열을 만들고 이 배열을 통해서 화면에 버튼을 만들고자 함 */}
          {totalPages &&
            [...Array(totalPages)].map((num, i) => (
              <PageBtn key={i} onClick={() => onClickChangePage(i)}>
                {i + 1}
              </PageBtn>
            ))}
        </PageBtnWrapper>
      </ItemWrapper>
    </MypageWrapper>
  );
};

export default memo(Mypage);
