import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    // require the logo image both from client and server
    return (
      <div>
        <Helmet title="Home"/>
        <div>
          <div className="container">
            home page
          </div>
        </div>
      </div>
    );
  }
}
