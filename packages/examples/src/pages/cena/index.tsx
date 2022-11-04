import WatchingYou from 'react-watching-you';
import styled from 'styled-components';
import cenaUrl from './cena.webp';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background: #444;
  overflow: hidden;
`;
const CenaWrapper = styled.div`
  position: absolute;
  bottom: -80px;
  left: 0;
`;
const Cena = styled.img.attrs({
  src: cenaUrl,
})`
  position: relative;
`;
const eyesPower = {
  x: 6,
  y: 2,
};

const WhitesOfEyes = styled.div`
  background: #ddd;
  position: absolute;
  height: 30px;
  width: 70px;
  top: 50px;
  left: 100px;
`;

const Eyeball = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  background: #222;
  width: 8px;
  height: 8px;
  transition: 0.1s transform;

  ::after {
    display: inline-block;
    content: '';
    background: #fff;
    width: 1px;
    height: 1px;
    filter: blur(1px);
    position: absolute;
    left: 25%;
    top: 25%;
    transform: translate(-50%, -50%);
  }
`;

const LeftEyeball = styled(Eyeball)`
  top: 60px;
  left: 127px;
`;

const RightEyeball = styled(Eyeball)`
  top: 64px;
  left: 160px;
`;
function Login() {
  return (
    <Container>
      <CenaWrapper>
        <WhitesOfEyes />
        <WatchingYou rotatable={false} power={eyesPower}>
          <LeftEyeball />
        </WatchingYou>
        <WatchingYou rotatable={false} power={eyesPower}>
          <RightEyeball />
        </WatchingYou>
        <Cena />
      </CenaWrapper>
    </Container>
  );
}

export default Login;
