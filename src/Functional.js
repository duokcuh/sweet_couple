import {useEffect, useState} from 'react';


export const Functional = () => {
  
  const [ value, setValue ] = useState();
  const [ images, setImages ] = useState();
  
  const changeHandler = event => setValue(event.target.value);
  
  const submitHandler = async () => {
    
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
    let response = await fetch(url + value);
    let result = response.json();
    let images = result.data.map(gif => gif.images.fixed_height.url);
    setImages(images);
  
  }
  
  useEffect( () => {
  
  
  }, [images])
  
  return (
    <>
      <header>
        Functional component
      </header>
      <form onSubmit={ submitHandler }>
        <input type = 'text' value = {value} onChange={ changeHandler } />
        <input type = 'submit' value = 'Search' />
      </form>
      <div className='images-wrapper'>
      
      </div>
    </>
  )
}