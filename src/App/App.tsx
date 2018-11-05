import * as React from 'react';
import 'src/App/App.css';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";
interface AppProps {}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
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
