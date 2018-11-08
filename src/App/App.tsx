import * as React from 'react';
import 'src/App/App.css';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";

interface AppProps {
  link?: string;
  lang?: string;
}

class App extends React.Component<AppProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <AppHeader />
        <MainContent />
      </div>
    );
  }
}

export { App };
