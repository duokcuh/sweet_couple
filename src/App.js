import './App.css';
import { useState } from 'react';
import { Functional } from './Functional';
import { ClassBased } from './ClassBased';

function App() {
  
  const [ type, setType ] = useState(null);
  
  return (
    <div className="App">
      
      <div className="btn-wrapper">
        <button onClick={() => setType('class')}>
          ClassBased
        </button>
        <button onClick={() => setType('func')}>
          Functional
        </button>
      </div>
      
      {type && (type === 'class' ? <ClassBased /> : <Functional />)}
      
    </div>
  );
}

export default App;
