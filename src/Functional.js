import { useRef, useState } from 'react';
import { Images } from './Images';

export const Functional = () => {
  
  const [ value, setValue ] = useState('');
  const [ submitValue, setSubmitValue ] = useState(null);
  const history = useRef([]);
  
  const changeHandler = event => {
    setValue(event.target.value.trim() && event.target.value);
  };
  
  const submitHandler = event => {
    event.preventDefault();
    let currentValue = value.trim();
    setValue(currentValue);
    if (!currentValue || currentValue === submitValue) return;
    setSubmitValue(prev => {
      if(prev) history.current = [prev,...history.current.slice(0, 4)];
      return currentValue
    });
  }
  
  const undoSearch = event => {
    event.preventDefault();
    if(!history.current.length) return;
    let currentValue = history.current[0];
    history.current = history.current.slice(1);
    setValue(currentValue);
    setSubmitValue(currentValue);
  }
  
  return (
    <>
      <header>
        Functional component
      </header>
      <form className = 'container' onSubmit = { submitHandler }>
        <input
          className = 'form-search'
          type = 'text'
          placeholder = 'Find gif'
          value = { value }
          onChange = { changeHandler }
          required
          autoFocus
        />
        <button title = 'Search'>
          <i className = 'fas fa-search'/>
        </button>
        <button type = 'button' title = 'Undo' onClick = { undoSearch }>
          <i className = 'fas fa-undo'/>
        </button>
      </form>
      
      { submitValue && <Images query = { submitValue } /> }
      
    </>
  )
}