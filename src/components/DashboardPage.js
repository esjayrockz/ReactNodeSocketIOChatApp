import React from 'react';
import io from 'socket.io-client';

import Header from './Header';
import SendMessage from './SendMessage';
import Messages from './Messages';
import Geolocation from './Geolocation';

export default class DashboardPage extends React.Component {

  state = {
    connected: false,
    users: 0,
    messages: []
  };

  socket = io();

  handleAddMessage = (message) => {
    if(!message){
      return 'Enter valid message'; //If empty message is submitted
    }
    const messageObject = {
      from: 'User',
      text: message
    };
    this.socket.emit('createMessage', messageObject, function(){

    });
  };

  sendLocation = () => {
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser!');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, () => {
      alert('Unable to fetch location');
    });
  }

  componentDidMount(){

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('newMessage', (message) => {
      console.log(`${message.text} - from ${message.from} at ${message.createdAt}`);
      this.setState((prevState)=>({ messages: prevState.messages.concat(message) }));//Add message to the messages array
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
    });

  };

  render() {
    const title = 'Chat App';
    return (
      <div>
        <Header title={title}/>
        <SendMessage
          handleAddMessage={this.handleAddMessage}
        />
        <Messages
          messages={this.state.messages}
        />
        <Geolocation
          sendLocation={this.sendLocation}
        />
      </div>
      );
    }
  }
