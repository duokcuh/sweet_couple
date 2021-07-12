import { Loader } from './Loader';
import { useEffect, useReducer } from 'react';

const
  FETCH_SRC = 'FETCH_SRC',
  LOAD_IMG = 'LOAD_IMG';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_SRC:
      return {
        ...state,
        imgSrc: payload,
        loaded: 0,
        isLoading: payload.length > 0,
      };
    case LOAD_IMG:
      return {
        ...state,
        loaded: state.loaded + 1,
        isLoading: state.loaded + 1 !== payload.length,
      };
    default :
      return {
        ...state
      };
  }
}

export const Images = ({ query }) => {
  
  const [{ imgSrc, loaded, isLoading }, dispatch] = useReducer(reducer, {
    imgSrc: null,
    loaded: 0,
    isLoading: false,
  });
  
  useEffect( () => {
    
    const getSrc = async () => {
      let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
      let response = await fetch(url + query);
      let result = await response.json();
      let images = result.data.map(gif => gif.images.fixed_height.url);
  
      dispatch({
        type: FETCH_SRC,
        payload: images
      });
  
      images.forEach(src => {
        let img = new Image();
        img.src = src;
        img.onload = () => dispatch({
          type: LOAD_IMG,
          payload: images,
        });
      });
    };
    
    getSrc();
  
  }, [query]);
  
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