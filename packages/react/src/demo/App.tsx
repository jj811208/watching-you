import './App.css';
import Gazer from '../index';

const commonCss = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff',
  border: 'solid 2px #000',
  width: '60px',
  height: '100px',
  borderRadius: '50%',
};
const commonPower = {
  x: 22,
  y: 42,
};
function Section(props: any) {
  return (
    <div
      style={{
        border: 'solid 1px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        height: '100vh',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {props.children}
    </div>
  );
}
function Title(props: any) {
  return <h2 style={{}}>{props.children}</h2>;
}
function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Section>
        <Title>跟著滑鼠跑</Title>
        {new Array(5).fill('').map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {new Array(10).fill('').map((__, j) => (
              <div key={j} style={commonCss}>
                <Gazer power={commonPower}>
                  <div style={{ color: '#000' }}>O</div>
                </Gazer>
              </div>
            ))}
          </div>
        ))}
      </Section>
      <Section>
        <Title>跟著 dom 跑</Title>
        <div style={commonCss}>
          <Gazer
            power={commonPower}
            observed=".hot-girl"
            observedType="dom"
          >
            <div style={{ color: '#000' }}>O</div>
          </Gazer>
        </div>
        <div className="hot-girl">引人注意</div>
      </Section>
      <Section>
        <Title>大家都在跑</Title>
        <div className="run-man" style={commonCss}>
          <Gazer
            power={commonPower}
            observed=".hot-girl2"
            observedType="dom"
          >
            <div style={{ color: '#000' }}>O</div>
          </Gazer>
        </div>
        <div className="hot-girl2">引人注意</div>
      </Section>
      <Section>
        <Title>觀察 input 輸入變化</Title>
        <div style={commonCss}>
          <Gazer
            power={commonPower}
            observed=".hello-input"
            observedType="input"
          >
            <div style={{ color: '#000' }}>O</div>
          </Gazer>
        </div>
        <input className="hello-input" />
      </Section>
    </div>
  );
}

export default App;
