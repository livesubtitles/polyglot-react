import * as React from 'react';
import 'src/App/App.css';
<<<<<<< HEAD:src/App/App.tsx

import logo from 'src/media/logo.svg';
=======
import logo from 'src/media/logo.svg';
import { StatelessComponent } from 'src/StatelessComponent/StatelessComponent';
import { StatefulComponent } from 'src/StatefulComponent/StatefulComponent';
>>>>>>> f8cec288cdaf72adf66f12493fee429544044d15:app/src/App/App.tsx

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
