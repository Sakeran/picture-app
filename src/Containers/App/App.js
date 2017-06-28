import React, { Component } from 'react';
import 'normalize.css';
import './App.css';

import Header from '../../Components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-main">
          <p>Main content</p>
        </div>
      </div>
    );
  }
}

export default App;
