import * as React from 'react';
import 'src/App/App.css';
import logo from 'src/media/logo.svg';
import { UrlInput } from 'src/UrlInput/UrlInput';

interface AppProps {}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  private handleSearch(search: string): void {
    console.log(search);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        <UrlInput onSearch={this.handleSearch}/>
        </div>
        </div>
    );
  }
}

export { App };
