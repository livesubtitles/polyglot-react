import * as React from 'react';
import 'src/App/App.css';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";
import { URLParams } from "src/utils/interfaces";

class App extends React.Component<URLParams, {}> {
  constructor(props) {
    super(props);
    if (props.link) {
      console.log("LINK: " + props.link);
    }

    if (props.lang) {
      console.log("LANG: " + props.lang);
    }
  }

  public render() {
    return (
      <div className="App">
        <AppHeader />
        <MainContent {...this.props} />
      </div>
    );
  }
}

export { App };
