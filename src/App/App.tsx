import * as React from 'react';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";
import { URLParams } from "src/utils/interfaces";
import { createStyles, withStyles, WithStyles, MuiThemeProvider, CssBaseline, Button } from '@material-ui/core';
import { lightTheme, darkTheme } from 'src/Themes/themes';

const styles = createStyles({
  root: {
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
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
        <MuiThemeProvider
            theme={lightTheme}>
            <AppHeader/>
            <MainContent/>
          </MuiThemeProvider> 
        </div>
        
      </React.Fragment>
    );
  }
}

export const App = withStyles(styles)(AppComponent);
