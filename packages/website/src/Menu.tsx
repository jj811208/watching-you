import styled from 'styled-components';
import githubIconUrl from './assets/github-icon.png';

const Logo = styled.a`
  font-size: 32px;
  font-weight: bold;
`;
const LinkList = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  ${Logo} {
    margin-right: 24px;
  }
`;
const MenuContainer = styled.div`
  background: #fff;
`;
const MenuContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 32px;
  max-width: 1280px;
  margin: auto;

  a {
    font-size: 24px;
    color: #000;
    text-decoration: none;
  }
`;
function Eye() {
  return (
    <MenuContainer>
      <MenuContent>
        <LinkList>
          <Logo href="/#/">watching-you</Logo>
          <a
            href="https://github.com/jj811208/watching-you/tree/main/packages/core"
            target="_blank"
            rel="noreferrer"
          >
            javascript
          </a>
          <a
            href="https://github.com/jj811208/watching-you/tree/main/packages/react"
            target="_blank"
            rel="noreferrer"
          >
            react
          </a>
          <a
            href="https://github.com/jj811208/watching-you/tree/main/packages/vue"
            target="_blank"
            rel="noreferrer"
          >
            vue
          </a>
        </LinkList>
        <a
          href="https://github.com/jj811208/watching-you"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIconUrl} alt="github" />
        </a>
      </MenuContent>
    </MenuContainer>
  );
}

export default Eye;
