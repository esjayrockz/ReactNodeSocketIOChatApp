import React from 'react';
import io from 'socket.io-client';

export default class DashboardPage extends React.Component {

  state = {
    connected: false,
    users: 0
  };

  componentDidMount(){
    const socket = io();
    socket.on('connect', function(){
      console.log('Connected to server');
    });

    socket.on('newUser', function(message){
      console.log(`${message.text} - from ${message.from}`);
    });

    socket.on('newMessage', function(message){
      console.log(`${message.text} - from ${message.from} at ${message.createdAt}`);
    });

    socket.on('disconnect', function(){
      console.log('Disconnected to server');
    });

    socket.emit('createMessage', {
      from: 'Sender',
      text: 'Hey everyone!'
    }, function(data){
      console.log(data);
    });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Chat App</h1>
      </div>
      );
    }
  }
