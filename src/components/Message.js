import React from 'react';
import moment from 'moment';

export default class Message extends React.Component{


  componentDidMount() {
    this.props.calculateEachMessageHeight(this.message.clientHeight);
  }

  render(){

    const formattedTime = moment(this.props.messageText.createdAt).format('h:mm a');

    return (
      <li className="message" ref={(el) => { this.message = el; }}>
        <div className="message__title">
          <h4>{this.props.messageText.from}</h4>
          <span>{formattedTime}</span>
        </div>
        <div className="message__body">
          <p>{this.props.messageText.text?this.props.messageText.text: <a href={this.props.messageText.url} target="_blank">My current location</a>}</p>
        </div>
      </li>
    );
  }
}
