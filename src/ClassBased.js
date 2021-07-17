import { Component } from 'react';
import { Images } from './Images';


export class ClassBased extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitValue: null,
    };
    this.history = [];
  }
  
  changeHandler = event => {
    this.setState({value: event.target.value.trim() && event.target.value})
  };
  
  submitHandler = event => {
    event.preventDefault();
    let currentValue = this.state.value.trim();
    this.setState({value: currentValue});
    if (!currentValue || currentValue === this.state.submitValue) return;
    this.setState(({submitValue: prev}) => {
      if(prev) this.history = [prev,...this.history.slice(0, 4)];
      return {submitValue: currentValue}
    });
  }
  
  undoSearch = event => {
    event.preventDefault();
    if(!this.history.length) return;
    let currentValue = this.history[0];
    this.history = this.history.slice(1);
    this.setState({
        value: currentValue,
        submitValue: currentValue,
    });
  }
  
  render() {
    return (
      <>
        <header>
          ClassBased component
        </header>
        <form className = 'container' onSubmit = { this.submitHandler }>
          <input
            className = 'form-search'
            type = 'text'
            placeholder = 'Find gif'
            value = { this.state.value }
            onChange = { this.changeHandler }
            required
            autoFocus
          />
          <button title = 'Search'>
            <i className = 'fas fa-search'/>
          </button>
          <button type = 'button' title = 'Undo' onClick = { this.undoSearch }>
            <i className = 'fas fa-undo'/>
          </button>
        </form>
  
        { this.state.submitValue && <Images query = { this.state.submitValue } /> }
        
      </>
    )
  }
}