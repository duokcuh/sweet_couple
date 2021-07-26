import { useRef, useState } from 'react';
import { Images } from './Images';
import { HistoryButton } from './HistoryButton';

export const Functional = () => {
  
  const [ value, setValue ] = useState('');
  const [ submitValue, setSubmitValue ] = useState(null);
  const history = useRef({
    arr: [],
    id: 0,
  });
  
  const changeHandler = event => {
    setValue(event.target.value.trim() && event.target.value);
  };
  
  const submitHandler = event => {
    event.preventDefault();
    let currentValue = value.trim();
    setValue(currentValue);
    if (!currentValue || currentValue === submitValue) return;
    let { arr, id } = history.current;
    history.current = {
      arr: [currentValue, ...arr.slice(id, id+4)],
      id: 0,
    };
    setSubmitValue(currentValue);
  };
  
  const undoSearch = (event, param) => {
    event.preventDefault();
    let { arr, id } = history.current;
    if(arr[id + param] === undefined) return;
    let currentValue = arr[id + param];
    history.current.id = id + param;
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
          <i className = 'fas fa-search' />
        </button>
        <HistoryButton
          history = { history.current }
          type = 'back'
          clickHandler = { undoSearch }
        />
        <HistoryButton
          history = { history.current }
          type = 'forward'
          clickHandler = { undoSearch }
        />
        
      </form>
      
      { submitValue && <Images query = { submitValue } key = { submitValue } /> }
      
    </>
  )
}