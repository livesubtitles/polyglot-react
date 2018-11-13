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
import * as io from 'socket.io-client';
import * as Hls from "hls.js";

// const SERVER_URL = "https://polyglot-livesubtitles.herokuapp.com/";

interface MainContentState {
    loading: boolean;
    error: PolyglotErrorType;
    mediaURL: string;
    socket: SocketIOClient.Socket;
}

const styles = (theme : Theme) => createStyles({
  root: {
    height: "100%",
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

 videoCSS: any = {
    width: "640px",
    height: "360px",
    border: "solid 1px",
  };

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: null,
          mediaURL: null,
          socket: io('http://polyglot-livesubtitles.herokuapp.com/streams'),
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.restoredError = this.restoredError.bind(this);
        this.loadVideo = this.loadVideo.bind(this);
    }


    private displayError(error: PolyglotErrorType) {
      this.setState({error: error});
    }

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

      return (<div><div id="loadingdiv">Loading...</div><div id="videodiv" className={classes.root}>
        <div className={classes.videoSide}>
        {/*
           LEFT SIDE
        */}
        </div>
        <div className={classes.centre}>
          <div className={classes.video}>
         <video id="video" style={this.videoCSS}></video>
          </div>
        </div>
        <div className={classes.videoSide}>
        {/*
           LEFT SIDE
        */}
        </div>
      </div></div>);
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
      this.state.socket.emit('stream', {url: url, lang: lang});
    }

    private setLoadingStateUntilVideoIsLoaded(hls) {
      const self = this;
      hls.on(Hls.Events.BUFFER_APPENDED, function() {
        console.log("Buffer appended");
        document.getElementById("loadingdiv").style.display = "none";
        document.getElementById("videodiv").style.display = "block";
      });
    }

    private loadVideo(manifest_url: string): void {
      if (Hls.isSupported()) {
          console.log("Hls Supported. Got manifest url: " + manifest_url);


          var hls = new Hls();
          console.log("Loading manifest url...");
          hls.loadSource(manifest_url);
          console.log("Attatching Media...")
          document.getElementById("videodiv").style.display = "none";
          document.getElementById("loadingdiv").style.display = "block";
          hls.attachMedia(document.getElementById("video") as HTMLVideoElement);
          this.setLoadingStateUntilVideoIsLoaded(hls);
          hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              console.log("Manifest Loaded");
          });
      }
    }

    private setUpSocketStreamListener(): void {

      const self = this;

      this.state.socket.on('connect', () => {
          console.log("Socket connected");
      });


      this.state.socket.on('server-ready', () => {
          self.state.socket.emit('stream', {url: "https://www.youtube.com/watch?v=XOacA3RYrXk", lang: "es-ES"});
      });


      this.state.socket.on('stream-response', function(data) {
          console.log("Recieved stream-response");
          var json = JSON.parse(data);

          if (json.media == "") {
            console.log("Empty media");
              return;
          }

          let manifest_url = json.media;
          self.setState({ mediaURL: manifest_url }, () => self.loadVideo(manifest_url));
      });


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
        return (<div><CircularProgress/><video id="video" style={this.videoCSS}></video></div>);
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
