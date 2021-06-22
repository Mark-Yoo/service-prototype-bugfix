import React, { useCallback, useEffect, memo } from 'react';
import {
  LoginInput,
  LoginForm,
  LoginBtn,
  BtnWrapper,
  LoginInputLabel,
} from './styles';
import { FormWrapper, InputWrapper } from '../Signup/styles';
import { useInput } from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenSignIn } from '../../modules/postInfo';

const SignIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { statusCode } = useSelector((state) => state.postInfo);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getTokenSignIn({ email: email, password: password }));
    },
    [email, password, dispatch],
  );

  useEffect(() => {
    if (statusCode === 401) alert('비밀번호를 확인해주세요');
  }, [statusCode]);

  return (
    <>
      <FormWrapper>
        <LoginForm onSubmit={onSubmit}>
          <InputWrapper>
            <LoginInputLabel htmlFor="user-login-email">이메일</LoginInputLabel>
            <LoginInput
              name="user-login-email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <LoginInputLabel htmlFor="user-login-password">
              비밀번호
            </LoginInputLabel>
            <LoginInput
              name="user-login-password"
              type="password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </InputWrapper>
          <BtnWrapper>
            <LoginBtn type="onSubmit">로그인</LoginBtn>
          </BtnWrapper>
        </LoginForm>
      </FormWrapper>
      {statusCode === 401 && <div>비밀번호를 확인해주세요</div>}
    </>
  );
};

export default memo(SignIn);
