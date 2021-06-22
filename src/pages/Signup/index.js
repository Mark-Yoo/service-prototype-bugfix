import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { useInput } from '../../hooks/useInput';
import { emailRegex, passwordRegex } from '../../service/RegEx';
import { useDispatch } from 'react-redux';
import {
  SignupForm,
  Input,
  Label,
  InputWrapper,
  SubmitButton,
  ErrorAlert,
  FormWrapper,
} from './styles';
import { getTokenSignUp } from '../../modules/postInfo';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [passwordCheckAlert, setPasswordCheckAlert] = useState(false);
  const emailInput = useRef();
  const dispatch = useDispatch();

  const onValidateEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  const onValidatePassword = useCallback(() => {
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (emailError) {
        emailInput.current.focus();
        return;
      }
      if (passwordError) {
        setPasswordAlert(true);
        return;
      }
      if (password !== passwordCheck) {
        setPasswordCheckAlert(true);
        return;
      }
      dispatch(
        getTokenSignUp({
          email: email,
          password: password,
          mobile: phoneNumber,
        }),
      );
    },
    [
      password,
      passwordCheck,
      passwordError,
      emailError,
      phoneNumber,
      dispatch,
      email,
    ],
  );

  useEffect(() => {
    if (password) onValidatePassword();
  }, [password, onValidatePassword]);

  return (
    <FormWrapper>
      <SignupForm onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="user-email">이메일</Label>
          <Input
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            onBlur={onValidateEmail}
            required
            emailError={emailError}
            ref={emailInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="user-password">비밀번호</Label>
          <Input
            name="user-password"
            value={password}
            type="password"
            onChange={onChangePassword}
            required
            passwordError={passwordError}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="user-passwordCheck">비밀번호 확인</Label>
          <Input
            name="user-passwordCheck"
            value={passwordCheck}
            type="password"
            onChange={onChangePasswordCheck}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="user-phoneNumber">연락처</Label>
          <Input
            name="user-phoneNumber"
            value={phoneNumber}
            type="number"
            onChange={onChangePhoneNumber}
            required
          />
        </InputWrapper>
        <SubmitButton type="submit">가입하기</SubmitButton>
      </SignupForm>
      {emailError && <ErrorAlert>이메일 형식이 올바르지 않습니다.</ErrorAlert>}
      {passwordAlert && <ErrorAlert>비밀번호 양식에 맞지 않습니다.</ErrorAlert>}
      {passwordCheckAlert && (
        <ErrorAlert>비밀번호와 비밀번호 확인이 일치하지 않습니다.</ErrorAlert>
      )}
    </FormWrapper>
  );
};

export default memo(SignUp);
