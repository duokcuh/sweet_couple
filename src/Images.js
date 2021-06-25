import { Loader } from './Loader';
import { useState } from 'react';


export const Images = async ({ value }) => {
  
  const [ imgSrc, setImgSrc ] = useState(null);
  const [ isLoading, setLoading ] = useState(false);
  const [ loaded, setLoaded ] = useState(0);
  
  let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
  let response = await fetch(url + value);
  let result = await response.json();
  let images = result.data.map(gif => gif.images.fixed_height.url);
  
  setImgSrc(images);
  setLoading(images.length > 0 );
  setLoaded(0);
  
  images.forEach(src => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(prevLoaded => {
        if (prevLoaded + 1 === images.length) setLoading(false);
        return (prevLoaded + 1)
      });
    }
  });
  
  return (
    <>
      { isLoading
        ?
        <>
          <p>Loading { Math.round(loaded/imgSrc.length*100) }%</p>
          <Loader />
        </>
        : imgSrc && (
        <>
          <p>{ imgSrc.length || 'No' } search results</p>
          <div className="images-wrapper">
            { imgSrc.map((elem, id) => <img src={elem} alt={id} key={id}/>) }
          </div>
        </>
      )
      }
    </>
  )
}