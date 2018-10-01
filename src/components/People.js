import React from 'react';

export default class People extends React.Component{

  render(){
    return (
      <div className="chat__sidebar">
        <h3>People</h3>
        <div id="users"></div>
      </div>
    );
  }
}
