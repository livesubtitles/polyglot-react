import * as React from 'react';
import 'src/App/App.css';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";
import { URLParams } from "src/utils/interfaces";
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    textAlign: "center",
  }
});

class AppComponent extends React.Component<URLParams & WithStyles<typeof styles>, {}> {
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppHeader />
        <MainContent {...this.props} />
      </div>
    );
  }
}

export const App = withStyles(styles)(AppComponent);