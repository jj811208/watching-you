import './App.css';
import Gazer from '../index';

const commonPower = {
  x: 22,
  y: 42,
};

function App() {
  return (
    <div className="container">
      <div className="section">
        <h2>Gaze your mouse</h2>
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
                  <Gazer power={commonPower}>
                    <div>O</div>
                  </Gazer>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Gaze a dom</h2>
        <div className="section_content">
          <div className="eye">
            <Gazer
              power={commonPower}
              observed=".eye-catching"
              observedType="dom"
            >
              <div>O</div>
            </Gazer>
          </div>
          <div className="eye-catching">eye-catching</div>
        </div>
      </div>
      <div className="section">
        <h2>Everything is moving</h2>
        <div className="section_content">
          <div className="running-gazer eye">
            <Gazer
              power={commonPower}
              observed=".eye-catching2"
              observedType="dom"
            >
              <div>O</div>
            </Gazer>
          </div>
          <div className="eye-catching2">eye-catching</div>
        </div>
      </div>
      <div className="section">
        <h2>Gaze the input value</h2>
        <div className="section_content">
          <div className="eye">
            <Gazer
              power={commonPower}
              observed=".hello-input"
              observedType="input"
            >
              <div className="transition">O</div>
            </Gazer>
          </div>
          <input className="hello-input" />
        </div>
      </div>
    </div>
  );
}

export default App;
