import React from 'react';

export default class Message extends React.Component{

  render(){
    return (
        <div>
          <p>{this.props.messageText.from}: {this.props.messageText.text?this.props.messageText.text: <a href={this.props.messageText.url} target="_blank">My current location</a>}</p>
        </div>
    );
  }
}
