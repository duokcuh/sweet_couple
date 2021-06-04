import './App.css';
import { useState } from 'react';

function App() {
  
  const [ type, setType ] = useState(null);
  
  return (
    <div className="App">
      <div className="btn-wrapper">
        <button onClick={() => setType('class')}>ClassBased</button>
        <button onClick={() => setType('func')}>Functional</button>
      </div>
      {type && <div>{type}</div>}
    </div>
  );
}

export default App;
