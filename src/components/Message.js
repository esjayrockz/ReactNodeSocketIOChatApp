import React from 'react';
import moment from 'moment';

export default class Message extends React.Component{

  render(){

    const formattedTime = moment(this.props.messageText.createdAt).format('h:mm a');

    return (
        <div>
          <p>{this.props.messageText.from} {formattedTime} : {this.props.messageText.text?this.props.messageText.text: <a href={this.props.messageText.url} target="_blank">My current location</a>}</p>
        </div>
    );
  }
}
