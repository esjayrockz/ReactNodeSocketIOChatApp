import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import Header from './Header';
import People from './People';
import SendMessage from './SendMessage';
import Messages from './Messages';

export class ChatScreenPage extends React.Component {

  state = {
    users: [],
    messages: [],
    locationButtonText: true
  };

  socket = io();

  handleAddMessage = (message, event) => {
    if(!message){
      return 'Enter valid message'; //If empty message is submitted
    }
    const messageObject = {
      from: 'User',
      text: message
    };
    const input = event.target.elements.message;
    this.socket.emit('createMessage', messageObject, () => {
      input.value = '';
    });
  };

  sendLocation = () => {
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser!');
    }
    this.setState(() => ({locationButtonText: false}));
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState(() => ({locationButtonText: true}));
      this.socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, () => {
      this.setState(() => ({locationButtonText: true}));
      alert('Unable to fetch location');
    });
  }


  componentDidMount(){
    this.socket.on('connect', () => {
      this.socket.emit('join', this.props.rooms, (err) => {
        if(err){
          alert(err);
          this.props.history.push('/');
        } else{
          console.log('No error');
        }
      });
    });


    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
    });

    this.socket.on('updateUserList', (users) => {
      this.setState(() => ({users}));
    });

    this.socket.on('newMessage', (message) => {
      console.log(`${message.text} - from ${message.from} at ${message.createdAt}`);
    if (this.refs.chatScreenRef) {
      if(message.from === 'Admin' && message.text === 'Welcome to the chat app.' && this.state.messages.length != 0){
        message.text = 'Connected back.';
        console.log('this.state.messages.length', this.state.messages.length);
        this.setState((prevState)=>({ messages: prevState.messages.concat(message) }));
      } else{
        console.log('this.state.messages.length', this.state.messages.length);
        this.setState((prevState)=>({ messages: prevState.messages.concat(message) }));//Add message to the messages array
      }
    }
    });

    this.socket.on('newLocationMessage', (message) => {
      if (this.refs.chatScreenRef) {
        this.setState((prevState)=>({ messages: prevState.messages.concat(message) }));
      }

    });

  };

  render() {
    const title = 'Chat App';
    return (
      <div className="chat" ref="chatScreenRef">
        <People
          users={this.state.users}
         />

        {/* <Header title={title} /> */}
        <div className="chat__main">
          <Messages
            messages={this.state.messages}
          />
          <SendMessage
            handleAddMessage={this.handleAddMessage}
            sendLocation={this.sendLocation}
            locationButtonText={this.state.locationButtonText}
          />
        </div>
      </div>
      );
    }
  }

const mapStateToProps = (state)=>{
  return {
    rooms: state.rooms
  };
};

export default connect(mapStateToProps)(ChatScreenPage);;
