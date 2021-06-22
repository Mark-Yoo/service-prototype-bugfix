import styled from 'styled-components';

export const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ItemImg = styled.img`
  width: 60%;
  height: 400px;
  margin: 0 auto;
  background-color: lime;
  @media screen and (max-width: 700px) {
    width: 80%;
    height: 300px;
  }
`;

export const ItemOrderBtn = styled.button`
  width: 60%;
  height: 50px;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;
