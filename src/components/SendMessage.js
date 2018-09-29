import React from 'react';

export default class SendMessage extends React.Component{

  state = {
    error: undefined
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const text = event.target.elements.message.value.trim();
    const error = this.props.handleAddMessage(text);
    this.setState(()=> ({ error }));
    if(!error){
      event.target.elements.message.value = ''; //This will clear the input form if no error
    }
  };

  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="message"/>
          <button>Send</button>
        </form>
      </div>
    );
  }
}
