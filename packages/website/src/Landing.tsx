import styled from 'styled-components';
import Eye from './Eye';
import GitHubLinkIcon from './GitHubLinkIcon';

const Hero = styled.div.attrs({ id: 'hero' })`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeroContent = styled.div`
  padding: 32px;
  max-width: 1280px;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
const HeroSlogan = styled.div`
  font-size: 44px;
  line-height: 1.4;
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;
const Eyes = styled.div`
  display: flex;
  gap: 16px;
`;
const ExampleLink = styled.a`
  font-size: 20px;
  color: #115599;
  text-decoration: none;
  align-self: flex-start;

  :hover{
    color: #444;
    transition: color: .2s;
  }
`;

function Landing() {
  return (
    <Hero>
      <GitHubLinkIcon />
      {/* <Menu /> */}
      <HeroContent>
        <Eyes>
          <Eye />
          <Eye />
        </Eyes>
        <HeroSlogan>
          <b>watching-you</b> building animations <wbr />
          that watch anything on DOM
        </HeroSlogan>

        {/* <ExamplesTitle>Examples</ExamplesTitle> */}
        <ExampleLink
          href="./#/example/login"
          target="_blank"
          rel="noreferrer"
        >
          Example 1. Login Form
        </ExampleLink>
        <ExampleLink
          href="./#/example/iron-chain"
          target="_blank"
          rel="noreferrer"
        >
          Example 2. Iron Chain
        </ExampleLink>
        <ExampleLink
          href="./#/example/cena"
          target="_blank"
          rel="noreferrer"
        >
          Example 3. Cena is watching you
        </ExampleLink>
        <ExampleLink
          href="./#/example/svg-path"
          target="_blank"
          rel="noreferrer"
        >
          Example 4. Svg path watcher
        </ExampleLink>
      </HeroContent>
    </Hero>
  );
}

export default Landing;
