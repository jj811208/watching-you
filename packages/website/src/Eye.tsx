import styled from 'styled-components';
import WatchingYou from 'react-watching-you';

const StyledEye = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 54px;
  border-radius: 50%;
  box-shadow: inset 0px 0px 6px #000;
  background: #fff;
`;
const EyeBall = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: rgb(112, 56, 0);
  background: linear-gradient(
    135deg,
    rgba(112, 56, 0, 1) 40%,
    rgba(242, 201, 0, 1) 100%
  );
`;
const EyeBall1 = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #2f1100;
`;
const EyeBall2 = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #fff;
`;
const power = { x: 15, y: 26 };

function Eye() {
  return (
    <StyledEye>
      <WatchingYou power={power} rotatable={false}>
        <EyeBall>
          <EyeBall1>
            <EyeBall2 />
          </EyeBall1>
        </EyeBall>
      </WatchingYou>
    </StyledEye>
  );
}

export default Eye;
