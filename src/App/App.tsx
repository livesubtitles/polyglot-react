import * as React from 'react';
import 'src/App/App.css';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";
import { URLParams } from "src/utils/interfaces";
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Information } from 'src/Information/Information';


const styles = createStyles({
  root: {
    textAlign: "center", // See if this attribute can be removed
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
<<<<<<< HEAD
  },
  nonHeader: {
    display: "flex",
    flex: "1"
  },
  sidebar: {
    flex: "0 0 15em",
  },
  content: {
    flex: "1"
  },
=======
  }
>>>>>>> 4885ba43dcd36809c90d5029bf5a5a003237798c
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
        <div className={classes.nonHeader}>
          <div className={classes.sidebar}>
            <Information/>
          </div>
          <div className={classes.content}>
          <MainContent {...this.props} />
          </div>
          <div className={classes.sidebar}>
          {//RIGHT SIDE
          }
          </div>
        </div>
      </div>
    );
  }
}

export const App = withStyles(styles)(AppComponent);