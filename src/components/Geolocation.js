import React from 'react';

export default class Geolocation extends React.Component{

  render(){
    return (
        <button onClick={this.props.sendLocation}>Send Location</button>
    );
  }
}
