

export const HistoryButton = ({history, type, clickHandler}) => {
  let faClass, param;
  let { arr, id } = history;
  
  switch(type) {
    case 'back':
      faClass = 'fas fa-arrow-left';
      param = 1;
      break;
    case 'forward':
      faClass = 'fas fa-arrow-right';
      param = -1;
      break;
    default:
      throw new Error('Wrong HistoryButton type!');
  }
  
  const setTitle = () => {
    if(arr[id + param] === undefined) return 'History is empty';
    return `Click ${type} to search "${arr[id + param]}"`
  }
  
  return (
    <button
      type = "button"
      title = { setTitle() }
      onClick = {event => clickHandler(event, param)}>
      <i className = {faClass} />
    </button>
  )
}