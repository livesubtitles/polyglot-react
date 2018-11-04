import * as React from 'react';
import 'src/App/App.css';
import logo from 'src/media/logo.svg';
import { StatelessComponent } from 'src/StatelessComponent/StatelessComponent';
import { StatefulComponent } from 'src/StatefulComponent/StatefulComponent';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
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
