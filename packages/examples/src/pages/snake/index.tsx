import { forwardRef } from 'react';
import WatchingYou from 'react-watching-you';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;
const Rect = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  background: red;
  border: solid 1px;
  width: 10px;
  height: 50px;
  transition: 0.1s transform;
`;

const Stick = forwardRef(({ number, ...rest }: any, ref) => {
  return (
    <Rect ref={ref} {...rest}>
      <div className={`stick-${number}-head`} />
      <div className={`stick-${number}-tail`} />
    </Rect>
  );
});
function Login() {
  return (
    <Container>
      <WatchingYou power={1000}>
        <Stick number={19} />
      </WatchingYou>
      {Array(19)
        .fill('')
        .map((_, i) => {
          return (
            <WatchingYou
              target={`.stick-${i + 1}-tail`}
              targetType="dom"
              power={1000}
              key={i}
            >
              <Stick number={i} />
            </WatchingYou>
          );
        })}
    </Container>
  );
}

export default Login;
