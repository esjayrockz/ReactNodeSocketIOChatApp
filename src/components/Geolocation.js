import React from 'react';

export default class Geolocation extends React.Component{

  render(){
    return (
        <button onClick={this.props.sendLocation} disabled={!this.props.locationButtonText}>{this.props.locationButtonText ? 'Send Location': 'Sending Location...'}</button>
    );
  }
}
