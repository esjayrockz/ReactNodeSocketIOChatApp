import React from 'react';
import Message from './Message';

export default class Messages extends React.Component {

  render(){
    return (
      <div className="chat__messages">
          {
            this.props.messages.map((message, index)=>(
            <Message
              key={index}
              count={index+1}
              messageText={message}
            />
            ))
          }
        </div>
      );
  }


}
