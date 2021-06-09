import { Component } from 'react';
import { Loader } from './Loader';


export class ClassBased extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      imgSrc: null,
      isLoading: false
    };
  }
  
  changeHandler = event => {
    this.setState(() => ({
      value: event.target.value
    }))
  }
  
  submitHandler = async event => {
    
    event.preventDefault();
    
    if (!this.state.value.trim()) return;
    
    this.setState({ isLoading: true });
    
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=JnxTmEGKXjZeUKBzRjTQoMDg8OX8pS5U&rating=pg&q=';
    let response = await fetch(url + this.state.value);
    let result = await response.json();
    
    let total = result.data.length;
    this.setState({ isLoading: total > 0 });
    let loaded = 0;
    let imgSrc = result.data.map(gif => {
      let src = gif.images.fixed_height.url
      let img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (total === loaded) this.setState({isLoading: false});
      }
      return src
    });
  
    this.setState({ imgSrc });
    
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
            // required = 'true'
          />
          <input
            className = 'form-submit'
            type = 'submit'
            value = 'Search'
          />
        </form>
    
        { this.state.isLoading
          ? <Loader />
          : this.state.imgSrc && (
            <div className = 'images-wrapper'>
              { this.state.imgSrc.map((elem, id) => <img src = { elem } alt = { id } key = { id } />) }
            </div>
          )
        }
      </>
    )
  }
}