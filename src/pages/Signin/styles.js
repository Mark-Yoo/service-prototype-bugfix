import styled from 'styled-components';

export const LoginForm = styled.form`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const InputWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  background-color: gold;
`;

export const LoginInputLabel = styled.label`
  width: 30%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`;

export const LoginInput = styled.input`
  width: 70%;
  height: 30px;
  border: 1px solid black;
  @media screen and (max-width: 700px) {
    width: 50%;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const LoginBtn = styled.button`
  width: 200px;
  height: 30px;
  margin: 10px;
`;
