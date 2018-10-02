import React from 'react';
import Message from './Message';

export default class Messages extends React.Component {

  state = {
    newMessageHeight: 0,
    lastMessageHeight: 0
  }

  scrollToBottom = () => {
    var clientHeight = this.messages.clientHeight;
    var scrollTop = this.messages.scrollTop;
    var scrollHeight = this.messages.scrollHeight;
    var newMessageHeight = this.state.newMessageHeight;
    var lastMessageHeight = this.state.lastMessageHeight;
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  calculateEachMessageHeight = (newMessageHeight) => {
    this.setState((prevState) => ({
      newMessageHeight,
      lastMessageHeight: prevState.newMessageHeight
  }));

  };

  componentDidUpdate() {
    // console.log(this.state.lastMessageHeight + ' ' + this.state.newMessageHeight + ' ' + this.state.count);
    this.scrollToBottom();
  }

  render(){
    return (
      <div className="chat__messages" ref={(el) => { this.messages = el; }}>
          {
            this.props.messages.map((message, index)=>(
            <Message
              key={index}
              count={index+1}
              messageText={message}
              calculateEachMessageHeight={this.calculateEachMessageHeight}
            />
            ))
          }
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      );
  }


}
