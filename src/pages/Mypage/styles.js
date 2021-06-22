import styled from 'styled-components';

export const MypageWrapper = styled.div`
  width: 100%;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  width: 50%;
  height: 100px;
  margin: 10px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
`;

export const PageBtnWrapper = styled.div`
  margin: 0 auto;
`;

export const PageBtn = styled.button`
  width: 50px;
  height: 50px;
  margin: 10px;
`;
