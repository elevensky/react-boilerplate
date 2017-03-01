import React, { Component, PropTypes } from 'react';
import './App.less';

export default function App(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}
