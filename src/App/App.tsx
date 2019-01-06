import * as React from 'react';
import { MainContent } from "src/MainContent/MainContent";
import { URLParams } from "src/utils/interfaces";
import { createStyles, withStyles, WithStyles, MuiThemeProvider, CssBaseline, Button, createMuiTheme, WithTheme } from '@material-ui/core';
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import { Information } from 'src/Information/Information';
import { QualityDropdown } from "src/QualityDropdown/QualityDropdown";
import $ from 'jquery';
import { Help } from 'src/Help/Help';
import { authPostReq } from "src/utils/web";
import { AuthReply } from "src/utils/interfaces";
declare const gapi;

const drawerWidth = 240;

const themeM = createMuiTheme({
  palette: {
    primary: { main: "#42a5f5" },
    secondary: { main: '#f50057' },
  },
  typography: { useNextVariants: true },
});

const styles = theme => createStyles({
    appRoot: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    button: {
      position: "absolute",
      right: "1em"
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing.unit * 7 + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9 + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
    topPadding: {
      paddingTop: "100px",
      width: "100%"
    }
});

enum APP_MODE {
  HOME,
  INFO,
  HELP,
}

interface AppState {
  open: boolean;
  appMode: APP_MODE;
  loggedInEmail: string;
}

class AppComponent extends React.Component<URLParams & WithStyles<typeof styles>
                                          & WithTheme, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      appMode: APP_MODE.HOME,
      loggedInEmail: null,
    };

    this.signInCallback = this.signInCallback.bind(this);
  }

  private handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  private handleDrawerClose = () => {
    this.setState({ open: false });
  };

  private handleInfoClick = () => {
    this.setState({ appMode: APP_MODE.INFO });
  };

  private handleHomeClick = () => {
    this.setState({ appMode: APP_MODE.HOME })
  }

  private handleHelpClick = () => {
    console.log("help clicked");
    this.setState({ appMode: APP_MODE.HELP });
  }

  private signInRequest = async () => {
      console.log("before get getAuthInstance");
     var googleapi = gapi.auth2.getAuthInstance();
     console.log("before grantOfflineAccess");
     const authResult = await googleapi.grantOfflineAccess();
     console.log("Before sign in callback");
     await this.signInCallback(authResult);
     console.log("After sign in callback");
  }

  private signInCallback = async (authResult) => {
    if (authResult['code']) {
    // $('#signinButton').attr('style', 'display: none');
      const res = await authPostReq(
       'https://polyglot-livesubtitles.herokuapp.com', "storeauthcode",
       authResult['code'],
       'application/octet-stream; charset=utf-8');

       const result = res as any;
       console.log("Set state log email");
       console.log(result);
       this.setState({ loggedInEmail: result.email });
    // $.ajax({
    //   type: 'POST',
    //   url: 'https://polyglot-livesubtitles.herokuapp.com/storeauthcode',
    //   headers: {
    //   },
    //   contentType: 'application/octet-stream; charset=utf-8',
    //   success: function(result) {
    //     this.setState({ loggedInEmail: result.email });
    //   },
    //   processData: false,
    //   data: authResult['code']
    // });
    } else {
      console.log("Error");
    }
  };


  render() {
    const { classes, theme } = this.props;

    let body = null;

    if (this.state.appMode == APP_MODE.HOME) {
      body =  <MainContent
                link={this.props.link}
                lang={this.props.lang}/>;
    } else if (this.state.appMode == APP_MODE.INFO) {
      body = <Information/>;
    } else if (this.state.appMode == APP_MODE.HELP) {
      body = <Help onFinish={() => this.setState({ appMode: APP_MODE.HOME })} />;
    }

    const loggedInComponent = (this.state.loggedInEmail);
    const signInComponent = (
      <Button variant="contained" color="secondary" className={classes.button} onClick={this.signInRequest}>
        Sign In
      </Button>
    );


    return (
    <MuiThemeProvider theme={themeM}>
      <div className={classes.appRoot}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              id="openDrawerButton"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
            Polyglot
            </Typography>
            {this.state.loggedInEmail ? loggedInComponent : signInComponent}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton
            id="closeDrawerButton"
            onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem id="homeButtonApp" button
                      onClick={this.handleHomeClick}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem id="infoButtonApp" button
                      onClick={this.handleInfoClick}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Information" />
            </ListItem>
            <ListItem id="helpButtonApp" button
                      onClick={this.handleHelpClick}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar}/>
          {body}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export const App = withStyles(styles, { withTheme: true })(AppComponent);
