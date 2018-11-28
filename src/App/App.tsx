import * as React from 'react';
import { AppHeader } from "src/AppHeader/AppHeader";
import { MainContent } from "src/MainContent/MainContent";
import { URLParams } from "src/utils/interfaces";
import { createStyles, withStyles, WithStyles, MuiThemeProvider, CssBaseline, Button, createMuiTheme, WithTheme } from '@material-ui/core';
import { lightTheme, darkTheme } from 'src/Themes/themes';
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
declare const gapi;

const drawerWidth = 240;

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
      marginLeft: 900
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
}

interface AppState {
  open: boolean;
  appMode: APP_MODE;
}

class AppComponent extends React.Component<URLParams & WithStyles<typeof styles>
                                          & WithTheme, AppState> {
  constructor(props) {
    super(props);
    if (props.link) {
      console.log("LINK: " + decodeURIComponent(props.link));
    }

    if (props.lang) {
      console.log("LANG: " + props.lang);
    }

    this.state = {
      open: false,
      appMode: APP_MODE.HOME,
    };
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

  private signInRequest = () => {
     var googleapi = gapi.auth2.getAuthInstance();
     googleapi.grantOfflineAccess().then(this.signInCallback);
  }

  private signInCallback = (authResult) => {
    if (authResult['code']) {
    // $('#signinButton').attr('style', 'display: none');
    $.ajax({
      type: 'POST',
      url: 'https://polyglot-livesubtitles.herokuapp.com/storeauthcode',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      contentType: 'application/octet-stream; charset=utf-8',
      success: function(result) {
        // Handle or verify the server response.
      },
      processData: false,
      data: authResult['code']
    });
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
    }


    return (
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
            <Button variant="outlined" className={classes.button} onClick={this.signInRequest}>
             Sign In
            </Button>
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
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button
                      onClick={this.handleHomeClick}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button
                      onClick={this.handleInfoClick}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Information" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar}/>
          {body}
        </div>
      </div>
    );
  }
}

export const App = withStyles(styles, { withTheme: true })(AppComponent);
