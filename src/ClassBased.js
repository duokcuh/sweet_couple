import { Component } from 'react';
import { Images } from './Images';
import { HistoryButton } from './HistoryButton';


export class ClassBased extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitValue: null,
    };
    this.history = {
      arr: [],
      id: 0,
    };
  }
  
  changeHandler = event => {
    this.setState({value: event.target.value.trim() && event.target.value})
  };
  
  submitHandler = event => {
    event.preventDefault();
    let currentValue = this.state.value.trim();
    this.setState({value: currentValue});
    if (!currentValue || currentValue === this.state.submitValue) return;
    let { arr, id } = this.history;
    this.history = {
      arr: [currentValue, ...arr.slice(id, id+4)],
      id: 0,
    };
    this.setState({submitValue: currentValue});
  }
  
  undoSearch = (event, param) => {
    event.preventDefault();
    let { arr, id } = this.history;
    if(arr[id + param] === undefined) return;
    let currentValue = arr[id + param];
    this.history.id = id + param;
    this.setState({
      value: currentValue,
      submitValue: currentValue
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
          <HistoryButton
            history = { this.history }
            type = 'back'
            clickHandler = { this.undoSearch }
          />
          <HistoryButton
            history = { this.history }
            type = 'forward'
            clickHandler = { this.undoSearch }
          />
        </form>
  
        { this.state.submitValue && <Images query = { this.state.submitValue } /> }
        
      </>
    )
  }
}