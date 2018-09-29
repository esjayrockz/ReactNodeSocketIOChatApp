import React from 'react';
import Message from './Message';

export default class Messages extends React.Component {

  render(){
    return (
      <div>
        <div>
          <h3>Your Messages</h3>
        </div>
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
