import * as React from 'react';
import './App.css';
import logo from '../media/logo.svg';
import { StatelessComponent } from '../StatelessComponent/StatelessComponent';
import { StatefulComponent } from '../StatefulComponent/StatefulComponent';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        <StatelessComponent
          dummyField="dummy text"
        />
        <StatefulComponent
          dummyProp="hello"
        />
        </p>
      </div>
    );
  }
}

export default App;
