import { Component } from 'react';
import { Images } from './Images';


export class ClassBased extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitValue: null,
    };
  }
  
  changeHandler = event => {
    this.setState({value: event.target.value.trim() && event.target.value})
  };
  
  submitHandler = event => {
    
    event.preventDefault();
    let currentValue = this.state.value.trim();
    this.setState({value: currentValue});
    if (!currentValue) return;
    this.setState({submitValue: currentValue});
    
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
  
        { this.state.submitValue && <Images query = { this.state.submitValue } /> }
      </>
    )
  }
}