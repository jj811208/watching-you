import WatchingYou from 'react-watching-you';
import styled from 'styled-components';
import GitHubLinkIcon from '../../GitHubLinkIcon';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 24px 0;
  gap: 16px;
  overflow: hidden;
`;
const Eye = styled.div`
  border: solid 1px;
  border-radius: 50%;
  width: 100px;
  flex: 0 0 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: hidden;
  transition: 0.3s transform;
`;
const Eyeball = styled.div`
  display: inline-block;
  border-radius: 50%;
  background: #000;
  width: 20px;
  height: 20px;
  transition: 0.1s transform;
`;
const eyesPower = {
  x: 40,
  y: 25,
};

function SvgPath() {
  return (
    <Container>
      <GitHubLinkIcon />
      <Eye>
        <WatchingYou
          targetType="dom"
          target="#airplane"
          power={eyesPower}
        >
          <Eyeball />
        </WatchingYou>
      </Eye>
      <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="lightgrey"
          d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
        />

        <circle r="5" fill="red" id="airplane">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
          />
        </circle>
      </svg>
    </Container>
  );
}

export default SvgPath;
