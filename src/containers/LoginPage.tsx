import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import { Form, Field } from 'react-final-form'

import {authenticate} from '../store/actions/auth';
import {grayColor_01, NormalButton, redColor, whiteColor} from '../helpers/commonStyles';
import {RootState} from '../store';
import {AuthPayload} from '../store/reducers/auth';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormSection = styled.section`
  width: 520px;
  min-height: 425px;
  left: calc(50% - 520px / 2);
  top: 222px;
  background: ${whiteColor};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
`;

const LogoStyled = styled.img`
  margin-bottom: 20px;
`;

const ApiLogo = styled.span`
  color: #0D0D0D;
  font-size: 24px;
  line-height: 30px;
  font-weight: 400;
`;

const InputStyled = styled.input`
  width: 100%;
  margin-top: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 5px 10px;
  box-sizing: border-box;
  background: ${whiteColor};
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
`;

const InputWrapper = styled.div`
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  ${NormalButton}
  width: 110px;
  height: 40px;
  margin-top: 20px;
  color: ${whiteColor};
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  border: none;
  position: relative;
`;

const InputLabel = styled.label`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const OptionalInput = styled.span`
  float: right;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${grayColor_01};
  font-family: SF Pro Text;
`;

const ErrorBlock = styled.div`
  width: 100%;
  height: 70px;
  margin: 20px 0 0;
  background: rgba(207, 44, 0, 0.1);
  border-radius: 5px;
  display: flex;
`;

const ErrorIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 15px 10px 0 10px;
`;

const ErrorText = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: ${redColor};
  padding: 10px 0;
`;

const ErrorCode = styled.div`
  font-size: 12px;
  line-height: 20px;
  opacity: 0.5;
`;

const rotation = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg) ;
  };
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  };
`;

const Loader = styled.svg`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 50%;
  top: 50%;
  animation: ${rotation} 2s linear 0s infinite;
  transform: translate(-50%, -50%);
`;

const required = (value: string) => (value ? undefined : 'Required');
const password = (value: string) => (/^[a-zA-Z_0-9][a-zA-Z_0-9\s][^\s]*$/g.test(value) ? undefined : true);
const composeValidators = (...validators: any) => (value: string) =>
  validators.reduce((error:any, validator:any) => error || validator(value), undefined)

function LoginPage({history}: RouteComponentProps) {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.sessionKey?.length);
  const error = useSelector((state: RootState) => state.error.loginError);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/console');
    }
  }, [isLoggedIn]);

  const doLogin = (values: AuthPayload) => {
    dispatch(
      authenticate(values)
    );
  };

  function onSubmit(values: AuthPayload) {
    doLogin(values);
  }

  return (
    <Wrapper>
      <LogoStyled src="/icons/logo.svg" alt="" />
      <FormSection>
        <ApiLogo>API-Консолька</ApiLogo>
        {
          error ?
            <ErrorBlock>
              <ErrorIcon src="/icons/meh.svg" alt=""/>
              <ErrorText>
                <div>Вход не вышел</div>
                <ErrorCode>{error}</ErrorCode>
              </ErrorText>
            </ErrorBlock>
            : ''
        }
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="login"
                validate={composeValidators(required)}
              >
                {({ input, meta }) => (
                  <InputWrapper>
                    <InputLabel style={ meta.error && meta.touched ? {color: redColor} : {}}>Логин</InputLabel>
                    <InputStyled {...input}
                                 style={ meta.error && meta.touched ? {color: redColor, border: `1px solid ${redColor}`, boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)'} : {}}
                                 type="text"
                    />
                  </InputWrapper>
                )}
              </Field>

              <Field
                name="sublogin"
              >
                {({ input }) => (
                  <InputWrapper>
                    <InputLabel>Сублогин <OptionalInput>Опционально</OptionalInput></InputLabel>
                    <InputStyled {...input}
                                 type="text"
                    />
                  </InputWrapper>
                )}
              </Field>

              <Field
                name="password"
                validate={composeValidators(required, password)}
              >
                {({ input, meta }) => (
                  <InputWrapper>
                    <InputLabel style={ meta.error && meta.touched ? {color: redColor} : {}}>Пароль</InputLabel>
                    <InputStyled {...input}
                                 style={ meta.error && meta.touched ? {color: redColor, border: `1px solid ${redColor}`, boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)'} : {}}
                                 type="password"
                    />
                  </InputWrapper>
                )}
              </Field>

              <SubmitButton type="submit" disabled={submitting}>
                {loading ?
                  <Loader>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.2" d="M11.9998 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path opacity="0.7" d="M11.9998 18V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.92969 4.93005L7.75969 7.76005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path opacity="0.6" d="M16.2397 16.24L19.0697 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path opacity="0.9" d="M1.99976 12H5.99976" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path opacity="0.4" d="M17.9998 12H21.9998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path opacity="0.8" d="M4.92969 19.07L7.75969 16.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path opacity="0.3" d="M16.2397 7.76005L19.0697 4.93005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Loader>
                  : 'Войти'}
              </SubmitButton>
            </form>
          )}
        />
      </FormSection>
    </Wrapper>
  );
}

export default withRouter(LoginPage);
