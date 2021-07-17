import { Loader } from './Loader';
import { useEffect, useReducer, useRef } from 'react';

const
  FETCH_SRC = 'FETCH_SRC',
  LOAD_IMG = 'LOAD_IMG';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_SRC:
      return {
        ...state,
        imgSrc: payload,
        isLoading: payload.length > 0,
      };
    case LOAD_IMG:
      return {
        ...state,
        isLoading: payload,
      };
    default :
      return {
        ...state
      };
  }
}

export const Images = ({ query }) => {
  
  const [{ imgSrc, isLoading }, dispatch] = useReducer(reducer, {
    imgSrc: null,
    isLoading: false,
  });
  
  const loadingStatus = useRef();
  
  useEffect( () => {
    
    const getSrc = async () => {
      let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
      let response = await fetch(url + query);
      let result = await response.json();
      let images = result.data.map(gif => gif.images.fixed_height.url);
  
      dispatch({
        type: FETCH_SRC,
        payload: images,
      });
      
      let loaded = 0;
      
      const getImages = () => {
        loaded++;
        loadingStatus.current.textContent = Math.round(loaded / images.length * 100);
        dispatch({
          type: LOAD_IMG,
          payload: images.length !== loaded,
        });
      };
  
      images.forEach(src => {
        let img = new Image();
        img.src = src;
        img.onload = getImages;
        img.onerror = getImages;
      });
    };
    
    getSrc();
  
  }, [query]);
  
  return (
    <>
      { isLoading
        ?
        <>
          <p>Loading <span ref={loadingStatus} />%</p>
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