import styled from 'styled-components';
import WatchingYou from 'react-watching-you';

const StyledEye = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 64px;
  border-radius: 50%;
  border: #000 solid 2px;
  background: #fff;
`;
const EyeBall = styled.div`
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #000;
`;
const power = { x: 24, y: 32 };

function Eye() {
  return (
    <StyledEye>
      <WatchingYou power={power}>
        <EyeBall />
      </WatchingYou>
    </StyledEye>
  );
}

export default Eye;
