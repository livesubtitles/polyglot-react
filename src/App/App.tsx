import * as React from 'react';
import 'src/App/App.css';
import logo from 'src/media/logo.svg';
import { UrlInput } from 'src/UrlInput/UrlInput';
import { postJSON } from 'src/utils/web';
import CircularProgress from '@material-ui/core/CircularProgress';

interface AppProps {}

interface AppState {
  loading: boolean;
}

export interface InitialStreamPostArguments {
  url: string;
  lang: string;
}

export interface ProcessResponse {
  subtitle: string;
  lang: string;
}


const SERVER_URL = "https://vast-plains-75205.herokuapp.com";

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  private async handleSearch(search: string): Promise<void> {
    console.log(search);
    this.setState({ loading: true });
    const postPayload: InitialStreamPostArguments = { url: search, lang: "es-ES" };
    const res: ProcessResponse = await postJSON<ProcessResponse, InitialStreamPostArguments>(SERVER_URL, "stream", postPayload);
    console.log(res);
    this.setState({ loading: false });
  }

  public render() {
    let element;
    if (this.state.loading) {
      element = (<CircularProgress/>);
    } else {
      element = (<UrlInput onSearch={this.handleSearch}/>);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        {element}
        </div>
        </div>
    );
  }
}

export { App };
