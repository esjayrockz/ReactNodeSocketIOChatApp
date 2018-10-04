import React from 'react';
import Geolocation from './Geolocation';

export default class SendMessage extends React.Component{

  state = {
    error: undefined
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const text = event.target.elements.message.value.trim();
    const error = this.props.handleAddMessage(text, event);
    this.setState(()=> ({ error }));
  };

  render(){
    return (
      <div className="chat__footer">
        <form id="message-form" onSubmit={this.onFormSubmit}>
          <input type="text" name="message" placeholder="Message" autoFocus autoComplete="off"/>
          <button>Send</button>
        </form>
        <Geolocation
          sendLocation={this.props.sendLocation}
          locationButtonText = {this.props.locationButtonText}
        />
      </div>
    );
  }
}
