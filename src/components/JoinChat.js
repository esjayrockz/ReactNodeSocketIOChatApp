import React from 'react';
import { connect } from 'react-redux';
import { submitChatRoomDetails } from '../actions/rooms';

export class JoinChat extends React.Component{

  isRealString = (str) => {
    return typeof str === 'string' && str.trim().length>0;
  }

  ignoreCaseAndSpacesForRooms = (room) => {
    return room.split(' ').map((word) => word.toLowerCase()).join('');
  }

  onSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value.trim();
    const room = event.target.elements.room.value.trim();
    if(!this.isRealString(name) || !this.isRealString(room)){
      alert('Name and room name are required.');
    } else {
      this.props.submitChatRoomDetails(name, this.ignoreCaseAndSpacesForRooms(room));
      this.props.history.push('/chatscreen');
    }
  }

  render(){

    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form onSubmit = {this.onSubmit}>
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
            <div className="form-field">
              <label>Display name</label>
              <input type="text" name="name" autoFocus />
            </div>
            <div className="form-field">
              <label>Room name</label>
              <input type="text" name="room" />
            </div>
            <div className="form-field">
              <button>Join</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitChatRoomDetails: (name, room) => dispatch(submitChatRoomDetails(name, room))
});

export default connect(undefined, mapDispatchToProps)(JoinChat);
