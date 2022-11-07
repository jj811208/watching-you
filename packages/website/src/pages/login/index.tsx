import { useState } from 'react';
import WatchingYou from 'react-watching-you';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
  overflow: hidden;
`;
const Face = styled.div`
  border: solid 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 30px;
  width: 120px;
  height: 80px;
  background: #fff7e7;
`;
const Eyes = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;
const Eye = styled.div<{ needToClose: boolean }>`
  border: solid 1px;
  border-radius: 50%;
  width: 45px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: hidden;
  transition: 0.3s transform;

  ${({ needToClose }) =>
    needToClose &&
    css`
      transform: scaleY(0.02);
    `}
`;
const Eyeball = styled.div`
  display: inline-block;
  border-radius: 50%;
  background: #000;
  width: 9px;
  height: 9px;
  transition: 0.1s transform;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
`;
const Username = styled.input``;
const Password = styled.input.attrs({ type: 'password' })``;
const eyesPower = {
  x: 20,
  y: 10,
};

function Login() {
  const [focusInput, setFocusInput] = useState('');
  const needToClose = focusInput === Password.toString();
  const isActive = focusInput !== '' && !needToClose;

  return (
    <Container>
      <Face>
        <Eyes>
          <Eye needToClose={needToClose}>
            <WatchingYou
              power={eyesPower}
              target={focusInput}
              targetType="input"
              active={isActive}
            >
              <Eyeball />
            </WatchingYou>
          </Eye>
          <Eye needToClose={needToClose}>
            <WatchingYou
              power={eyesPower}
              target={focusInput}
              targetType="input"
              active={isActive}
            >
              <Eyeball />
            </WatchingYou>
          </Eye>
        </Eyes>
      </Face>
      <Form>
        <Label>
          <span>Username</span>
          <Username
            onFocus={() => {
              setFocusInput(Username.toString());
            }}
            onBlur={() => {
              setFocusInput('');
            }}
          />
        </Label>
        <Label>
          <span>Password</span>
          <Password
            onFocus={() => {
              setFocusInput(Password.toString());
            }}
            onBlur={() => {
              setFocusInput('');
            }}
          />
        </Label>
      </Form>
    </Container>
  );
}

export default Login;
