const roomsReducerDefaultState = {
  name: '',
  room: ''
};

export default (state = roomsReducerDefaultState, action) =>{
  switch(action.type){
    case 'SUBMIT_CHAT_ROOM_DETAILS':
    return {
      ...state,
      name: action.name,
      room: action.room
    };
    default:
    return state;
  }
};
