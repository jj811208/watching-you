import { forwardRef } from 'react';
import WatchingYou from 'react-watching-you';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Rect = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  background: red;
  width: 10px;
  height: 20px;
  transition: 0.03s transform;
  position:absolute;
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
      {Array(24)
        .fill('')
        .map((_, i) => {
          return (
            <WatchingYou
              target={`.stick-${i + 1}-tail`}
              targetType="dom"
              power={20 * (i + 1)}
              key={i}
            >
              <Stick number={i} />
            </WatchingYou>
          );
        })}
      <WatchingYou power={500}>
        <Stick number={24} />
      </WatchingYou>
    </Container>
  );
}

export default Login;
