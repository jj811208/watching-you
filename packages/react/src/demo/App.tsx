import './App.css';
import WatchingYou from '../index';

const commonPower = {
  x: 22,
  y: 42,
};

function App() {
  return (
    <div className="container">
      <div className="section">
        <h2>Watching your mouse</h2>
        <div className="section_content">
          {new Array(4).fill('').map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
              }}
            >
              {new Array(5).fill('').map((__, j) => (
                <div key={j} className="eye">
                  <WatchingYou power={commonPower}>
                    <div>O</div>
                  </WatchingYou>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Watching a dom</h2>
        <div className="section_content">
          <div className="eye">
            <WatchingYou
              power={commonPower}
              target=".eye-catching"
              targetType="dom"
            >
              <div>O</div>
            </WatchingYou>
          </div>
          <div className="eye-catching">eye-catching</div>
        </div>
      </div>
      <div className="section">
        <h2>Everything is moving</h2>
        <div className="section_content">
          <div className="running-gazer eye">
            <WatchingYou
              power={commonPower}
              target=".eye-catching2"
              targetType="dom"
            >
              <div>O</div>
            </WatchingYou>
          </div>
          <div className="eye-catching2">eye-catching</div>
        </div>
      </div>
      <div className="section">
        <h2>Watching the input value</h2>
        <div className="section_content">
          <div className="eye">
            <WatchingYou
              power={commonPower}
              target=".hello-input"
              targetType="input"
            >
              <div className="transition">O</div>
            </WatchingYou>
          </div>
          <input className="hello-input" />
        </div>
      </div>
    </div>
  );
}

export default App;
