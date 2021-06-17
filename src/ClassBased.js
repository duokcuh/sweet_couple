import { Component } from 'react';
import { Loader } from './Loader';


export class ClassBased extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      imgSrc: null,
      isLoading: false,
      loaded: 0
    };
  }
  
  changeHandler = event => this.setState({ value: event.target.value });
  
  submitHandler = async event => {
    
    event.preventDefault();
    
    if (!this.state.value.trim()) return;
    
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
    let response = await fetch(url + this.state.value);
    let result = await response.json();
    let images = result.data.map(gif => gif.images.fixed_height.url);
  
    this.setState({
      imgSrc: images,
      isLoading: images.length > 0,
      loaded: 0,
    });
    
    images.forEach(src => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        this.setState(({ loaded }) => ({ loaded: loaded + 1 }));
        if (this.state.loaded === images.length) this.setState({ isLoading: false })
      }
    });
    
  }
  
  render() {
    return (
      <>
        <header>
          ClassBased component
        </header>
        <form onSubmit = { this.submitHandler }>
          <input
            className = 'form-search'
            type = 'text'
            placeholder = 'Find gif'
            value = { this.state.value }
            onChange = { this.changeHandler }
            required
          />
          <input
            className = 'form-submit'
            type = 'submit'
            value = 'Search'
          />
        </form>
    
        { this.state.isLoading
          ?
            <>
              <p>Loading { Math.round(this.state.loaded/this.state.imgSrc.length*100) }%</p>
              <Loader />
            </>
          : this.state.imgSrc && (
            <>
              <p>{ this.state.imgSrc.length || 'No' } search results</p>
              <div className="images-wrapper">
                { this.state.imgSrc.map((elem, id) => <img src={elem} alt={id} key={id}/>) }
              </div>
            </>
          )
        }
      </>
    )
  }
}