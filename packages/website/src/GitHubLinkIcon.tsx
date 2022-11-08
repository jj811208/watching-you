import styled from 'styled-components';
import githubIconUrl from './PNG/github-icon.png';

const Container = styled.a`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 16px;
  top: 16px;
`;

function GitHubLinkIcon() {
  return (
    <Container
      href="https://github.com/jj811208/watching-you"
      target="_blank"
      rel="noreferrer"
    >
      <img src={githubIconUrl} alt="github" />
    </Container>
  );
}

export default GitHubLinkIcon;
