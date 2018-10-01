import React from 'react';
import io from 'socket.io-client';

import Header from './Header';
import People from './People';
import SendMessage from './SendMessage';
import Messages from './Messages';

export default class DashboardPage extends React.Component {

  state = {
    connected: false,
    users: 0,
    messages: [],
    locationButtonText: true
  };

  socket = io();

  handleAddMessage = (message, event) => {
    if(!message){
      return 'Enter valid message'; //If empty message is submitted
    }
    console.log(event.target.elements + ' ' + message);
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
      console.log('Connected to server');
    });

    this.socket.on('newMessage', (message) => {
      console.log(`${message.text} - from ${message.from} at ${message.createdAt}`);
      this.setState((prevState)=>({ messages: prevState.messages.concat(message) }));//Add message to the messages array
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
    });

    this.socket.on('newLocationMessage', (message) => {
      this.setState((prevState)=>({ messages: prevState.messages.concat(message) }));
    });

  };

  render() {
    const title = 'Chat App';
    return (
      <div className="chat">
        <People className="chat__sidebar" />
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
