import { useState } from 'react';
import { Images } from './Images';

export const Functional = () => {
  
  const [ value, setValue ] = useState('');
  const [ submitValue, setSubmitValue ] = useState(null);
  
  const changeHandler = event => {
    setValue(event.target.value.trim() && event.target.value);
  };
  
  const submitHandler = event => {
    
    event.preventDefault();
    let currentValue = value.trim();
    setValue(currentValue);
    if (!currentValue) return;
    setSubmitValue(currentValue);
  
  }
  
  return (
    <>
      <header>
        Functional component
      </header>
      <form onSubmit = { submitHandler }>
        <input
          className = 'form-search'
          type = 'text'
          placeholder = 'Find gif'
          value = { value }
          onChange = { changeHandler }
          required
        />
        <input
          className = 'form-submit'
          type = 'submit'
          value = 'Search'
        />
      </form>
      
      { submitValue && <Images query = { submitValue } /> }
      
    </>
  )
}