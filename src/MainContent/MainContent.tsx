import * as React from 'react';
// import { postJSON } from 'src/utils/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  // ProcessResponse,
  // InitialStreamPostArguments,
  LanguageSuggestion,
  PolyglotErrorType,
  URLParams } from "src/utils/interfaces";
import { Search } from "src/Search/Search";
import { PolyglotError } from "src/PolyglotError/PolyglotError";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Information } from 'src/Information/Information';


// const SERVER_URL = "https://polyglot-livesubtitles.herokuapp.com/";

interface MainContentState {
    loading: boolean;
    error: PolyglotErrorType;
    mediaURL: string;
}

const styles = (theme : Theme) => createStyles({
  root: {
    height: "100vh",
    display: "flex",
  },
  side: {
    backgroundColor: theme.palette.secondary.main,
    flex: "0 0 22.5em",
  },
  centre: {
    backgroundColor: theme.palette.background.default, // remove this and the app bar shadow shows up???
    display: "flex",
    justifyContent: "center",
    height: "100%",
    flex: "1",
  },
  video: {
    paddingTop: "1.5em"
  },
  videoSide: {
    backgroundColor: "#555555",
    flex: "0 0 17em",
  },
  searchWrapper: {
    padding: "1em",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

class MainContentComponent extends React.Component<WithStyles<typeof styles> & URLParams, MainContentState> {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: null,
          mediaURL: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.restoredError = this.restoredError.bind(this);
    }

    /*
    private displayError(error: PolyglotErrorType) {
      this.setState({error: error});
    }
    */

    private restoredError() {
      this.setState({error: null});
    }

    private async handleSearch(search: string, lang: LanguageSuggestion): Promise<void> {
      this.setState({ loading: true });
      // const postPayload: InitialStreamPostArguments = { url: search, lang: lang.value };
      // const res: ProcessResponse = await postJSON<ProcessResponse, InitialStreamPostArguments>(SERVER_URL, "stream", postPayload);

      // if (res.error) {
      //   this.displayError(res.error);
      // }
      // console.log(res);
      this.setState({ loading: false });
    }

    private getVideoMode(classes, mediaURL: string) {
      const videoCSS: React.CSSProperties = {
        width: "640px",
        height: "360px",
        border: "solid 1px"
      };
      return (<div className={classes.root}>
        <div className={classes.videoSide}>
        {/*
           LEFT SIDE
        */}
        </div>
        <div className={classes.centre}>
          <div className={classes.video}>
          <video id="video" style={videoCSS}></video>
          </div>
        </div>
        <div className={classes.videoSide}>
        {/*
           LEFT SIDE
        */}
        </div>
      </div>);
    }

    private getDefaultMode(classes) {
      return (<div className={classes.root}>
        <div className={classes.side}>
          <Information
            imageWidthEm={200}
          />
        </div>
        <div className={classes.centre}>
          <div className={classes.searchWrapper}>
            <p>Try it out!</p>
            <Search onSearch={this.handleSearch} />
          </div>
        </div>
        <div className={classes.side}>
        {/*
           LEFT SIDE
        */}
        </div>
      </div>);
    }

    private emitSocketEventForMediaUrl(url: string, lang: string): void {
      console.log("Emit socket event with url and lang: " + url + ", " + lang);
    }

    private setUpSocketStreamListener(): void {
      // Probably within an on connect?
      console.log("Set up socket stream listener");
    }

    public componentDidMount() {

      // set up socket event listener
      this.setUpSocketStreamListener();
      // TODO: Grab link and language if we have them, emit socket event and set up socket event listener which will update mediaURLs
      if (this.props.link) {
        // We came from a link url
        const url: string = this.props.link;
        const lang: string = this.props.lang ? this.props.lang : "";
        // emit socket event
        this.emitSocketEventForMediaUrl(url, lang);
      }

    }

    render() {
      const { classes } = this.props;

      // TODO: Style this to appear in the center
      if (this.state.loading) {
        return (<CircularProgress/>);
      }

      if (this.state.error) {
        return (<PolyglotError error={this.state.error} restoredError={this.restoredError}/>);
      }

      if (this.state.mediaURL) {
        // We have the url, we might/might not have the language, but backend
        // takes care of that
        //return (<VideContent link={this.props.link} lang={this.props.lang ? this.props.lang : ""}/>);
        return (this.getVideoMode(classes, this.state.mediaURL));
      }

      return (this.getDefaultMode(classes));
    }

}

export const MainContent = withStyles(styles)(MainContentComponent);
