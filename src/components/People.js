import React from 'react';
import IndividualPerson from './IndividualPerson';

export default class People extends React.Component{

  render(){
    return (
      <div className="chat__sidebar">
        <h3>People</h3>
        <div id="users">
          <ul>
          {
            this.props.users.map((name, index)=>(
            <IndividualPerson
              key={index}
              count={index+1}
              name={name}
            />
            ))
          }
          </ul>
        </div>
      </div>
    );
  }
}
