import WatchingYou from 'react-watching-you';
import styled from 'styled-components';
import GitHubLinkIcon from '../../GitHubLinkIcon';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Circle = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  background: #555;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
`;

function IronChain() {
  return (
    <Container>
      <GitHubLinkIcon />
      {Array(10)
        .fill('')
        .map((_, i) => {
          return (
            <WatchingYou
              target={`.stick-${i + 1}`}
              targetType="dom"
              rotatable={false}
              power={20 * (i + 1)}
              key={i}
            >
              <Circle className={`stick-${i}`} />
            </WatchingYou>
          );
        })}
      <WatchingYou power={220}>
        <Circle className="stick-10" />
      </WatchingYou>
    </Container>
  );
}

export default IronChain;
