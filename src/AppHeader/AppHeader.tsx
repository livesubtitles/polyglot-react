import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#2196F3",
  }
});

interface AppHeaderProps extends WithStyles<typeof styles> {}


const AppHeaderSFC: React.SFC<AppHeaderProps>= (props: AppHeaderProps) => {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Polyglot - Live Subtitling
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const AppHeader = withStyles(styles)(AppHeaderSFC);
export { AppHeader };
