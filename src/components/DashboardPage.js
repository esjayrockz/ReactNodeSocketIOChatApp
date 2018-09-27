import React from 'react';
import io from 'socket.io-client';

export default class DashboardPage extends React.Component {

  state = {
    connected: false,
    users: 0
  };

  componentDidMount(){
    const socket = io();
    socket.on('connect', () => {
      this.setState(() => ({connected: true}));
      console.log('Connected to server');
      socket.emit('createMessage', {
        text: `User ${this.state.users} is connected`
      });
    });

    socket.on('disconnect', () => {
      this.setState(() => ({connected: false}));
      console.log('Disconnected to server');
    });

    socket.on('newConnection', (count) => {
      this.setState(() => ({users: count.users}));
    });

    socket.on('newMessage', (newMsg) => {
      console.log(newMsg.text);
    });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Chat App</h1>
        <p>We are {this.state.connected? 'connected':'disconnected'}</p>
        <p>Total number of connected users: {this.state.users}</p>
      </div>
      );
    }
  }
