import { useState } from 'react';
import { Loader } from './Loader';

export const Functional = () => {
  
  const [ value, setValue ] = useState('');
  const [ imgSrc, setImgSrc ] = useState(null);
  const [ isLoading, setLoading ] = useState(false);
  
  const changeHandler = event => setValue(event.target.value);
  
  const submitHandler = async event => {
    
    event.preventDefault();
    
    setLoading(true);
    
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
    let response = await fetch(url + value);
    let result = await response.json();
    setImgSrc(result.data.map(gif => gif.images.fixed_height.url));
    
    setLoading(false);
  
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
        />
        <input
          className = 'form-submit'
          type = 'submit'
          value = 'Search'
        />
      </form>
      
      { isLoading
        ? <Loader />
        : imgSrc && (
          <div className='images-wrapper'>
            { imgSrc.map((elem, id) => <img src = { elem } alt = { id } key = { id } />) }
          </div>
        )
      }
    </>
  )
}