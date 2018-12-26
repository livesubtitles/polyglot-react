import * as React from 'react';
// import { postJSON } from 'src/utils/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  // ProcessResponse,
  // InitialStreamPostArguments,
  LanguageSuggestion,
  PolyglotErrorType,
  URLParams,
  Quality } from "src/utils/interfaces";
import { Search } from "src/Search/Search";
import { PolyglotError } from "src/PolyglotError/PolyglotError";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import * as io from 'socket.io-client';
import * as Hls from "hls.js";
import Grid from '@material-ui/core/Grid';
import { FontSizeSlider } from "src/FontSizeSlider/FontSizeSlider";
import { FontFamilySelector } from "src/FontFamilySelector/FontFamilySelector";
import * as ColorPicker from "material-ui-color-picker";
import "src/MainContent/MainContent.css";
import { QualityDropdown } from "src/QualityDropdown/QualityDropdown";
import { SubtitleLanguageDropdown } from "src/SubtitleLanguageDropdown/SubtitleLanguageDropdown";
import { SubtitleOptions } from "src/SubtitleOptions/SubtitleOptions";
import { VideoOptions } from "src/VideoOptions/VideoOptions";


// const SERVER_URL = "https://polyglot-livesubtitles.herokuapp.com/";

interface MainContentState {
    error: PolyglotErrorType;
    mediaURL: string;
    qualities: Quality[];
    socket: SocketIOClient.Socket;
    hls: Hls;
}

const styles =  createStyles({
  root: {
    height: "100vh",
    display: "flex",
    width: "100%",
  },
  centre: {
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

type StylesAndURLParams = WithStyles<typeof styles> & URLParams;

interface MainContentProps extends StylesAndURLParams {
  socket?: any;
}

class MainContentComponent extends React.Component<MainContentProps, MainContentState> {

 videoCSS: any = {
    width: "640px",
    height: "360px",
    border: "solid 1px",
  };

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          mediaURL: null,
          qualities: [],
          socket: null,
          hls: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.restoredError = this.restoredError.bind(this);
        this.loadVideo = this.loadVideo.bind(this);
        this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
        this.handleFontSelection = this.handleFontSelection.bind(this);
        this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
        this.handleSubtitleColorChange = this.handleSubtitleColorChange.bind(this);
        this.handleQualitySelection = this.handleQualitySelection.bind(this);
        this.handleSubtitleLanguageChange = this.handleSubtitleLanguageChange.bind(this);
    }


    private displayError(error: PolyglotErrorType) {
      this.setState({error: error});
    }

    private restoredError() {
      location.reload();
    }

    private handleQualitySelection(quality: string) {
      this.state.socket.emit("quality", { quality: quality });
      this.state.hls.destroy();
    }

    private handleSubtitleLanguageChange(lang: string) {
      this.state.socket.emit("language", { sub_lang: lang})
    }

    private async handleSearch(search: string, lang: LanguageSuggestion): Promise<void> {
      this.showLoading("loadingdiv", "searchdiv");
      this.setUpSocketStreamListener(search, lang.value);
      // const postPayload: InitialStreamPostArguments = { url: search, lang: lang.value };
      // const res: ProcessResponse = await postJSON<ProcessResponse, InitialStreamPostArguments>(SERVER_URL, "stream", postPayload);

      // if (res.error) {
      //   this.displayError(res.error);
      // }
      // console.log(res);
    }

    private changeCueCSS(property: string, value: string) {
      console.log(`Change Cue CSS to: ${property} with value: ${value}`);
      const stylesheet = document.styleSheets[0] as any;
      // Complains because of compatibility issues with Firefox;
      stylesheet.addRule("::cue", `${property}: ${value}`);
    }

    private handleFontSizeChange(newSize: number): void {
      this.changeCueCSS("font-size", `${newSize}px`);
      //document.styleSheets[0].addRule("::cue", "font: italic 45px sans-serif");
    }

    private handleFontSelection(newFontFamily: string): void {
      this.changeCueCSS("font-family", newFontFamily);
    }

    private handleBackgroundColorChange(color: string) {
      this.changeCueCSS("background-color", color);
    }

    private handleSubtitleColorChange(color: string) {
      this.changeCueCSS("color", color);
    }

    private getVideoMode(classes, mediaURL: string, qualities: Quality[]) {

      return (<div><div id="loadingdiv" className="loadingcss"><CircularProgress/></div><div id="videodiv" className={classes.root}>
        <div className={classes.videoSide}>
        {/*
           LEFT SIDE
        */}
        </div>
        <div className={classes.centre}>
          <div className={classes.video}>
          <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              spacing={24}
           >
            <video id="video" style={this.videoCSS} controls></video>
           </Grid>
           <br/><br/>
           <SubtitleOptions
              onFontSizeChange={this.handleFontSizeChange}
              onFontSelection={this.handleFontSelection}
              onBackgroundColorChange={this.handleBackgroundColorChange}
              onSubtitleColorChange={this.handleSubtitleColorChange}
              onSubtitleLanguageChange={this.handleSubtitleLanguageChange}
            />
            <VideoOptions qualities={qualities} onQualitySelection={this.handleQualitySelection} />
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
        <div className={classes.centre}>
          <div id="loadingdiv" style={{display: "none"}} className="loadingcss"><CircularProgress/></div>
          <div id="searchdiv" className={classes.searchWrapper}>
            <Typography variant="h2" gutterBottom>Try it out!</Typography>
            <Search onSearch={this.handleSearch} />
          </div>
        </div>
      </div>);
    }

    private hideLoading(loadingDiv: string, showableDiv: string) {
      const lDiv = document.getElementById(loadingDiv);
      if (lDiv) {
        lDiv.style.display = "none";
      }

      const sDiv = document.getElementById(showableDiv);
      if (sDiv) {
        sDiv.style.display = "block";
      }
    }

    private showLoading(loadingDiv: string, showableDiv: string) {
      const sDiv = document.getElementById(showableDiv);
      if (sDiv) {
        sDiv.style.display = "none";
      }

      const lDiv = document.getElementById(loadingDiv);
      if (lDiv) {
        lDiv.style.display = "flex";
      }
    }

    private setLoadingStateUntilVideoIsLoaded(hls) {
      let self = this;
      hls.on(Hls.Events.BUFFER_APPENDED, function() {
        console.log("Buffer appended");
        console.log("LOADING DIV STATE: " + document.getElementById("loadingdiv").style.display);
        self.hideLoading("loadingdiv", "videodiv");
      });
    }

    private loadVideo(manifest_url: string): void {
      if (Hls.isSupported()) {
          console.log("Hls Supported. Got manifest url: " + manifest_url);


          var hls = new Hls();
          this.setState({ hls });
          console.log("Loading manifest url...");
          hls.loadSource(manifest_url);
          console.log("Attaching Media...")
          this.showLoading("loadingdiv", "videodiv");
          const v = document.getElementById("video") as HTMLVideoElement;
          hls.attachMedia(v);

          document.getElementById("video").onplay = function() {
                const vid = document.getElementById("video") as HTMLVideoElement;
                const textTrack = vid.textTracks[0];
                textTrack.mode = "showing";
          }

          this.setLoadingStateUntilVideoIsLoaded(hls);
          hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              console.log("Manifest Loaded");
          });
      }
    }

    private setUpSocketStreamListener(url: string, lang: string): void {

      const self = this;
      console.log(url);

      const socket: SocketIOClient.Socket = this.getSocket();
      // const socket: SocketIOClient.Socket = io('http://localhost:8000/streams');

      this.setState({ socket });

      socket.on('connect_error', () => {
        console.error("Sorry, there seems to be an issue with the connection");
        this.setState({ error: PolyglotErrorType.SocketConnection });
      });

      socket.on('streamlink-error', () => {
        console.error("Streamlink error");
        this.setState({ error: PolyglotErrorType.StreamlinkUnavailable });
      });

      socket.on('connect', () => {
          console.log("Socket connected");
      });

      socket.on("progress", () => {
          console.log("Progress from server");
      });

      socket.on('server-ready', () => {
          socket.emit('stream', {url: url, lang: lang});
      });

      socket.on('stream-response', function(data) {
          console.log("Received stream-response");
          var json = JSON.parse(data);

          if (json.media == "") {
              console.log("Empty media");
              self.displayError(PolyglotErrorType.StreamlinkUnavailable);
              return;
          }
          let manifest_url = json.media;
          const qualities: Quality[] = json.qualities;
          const loadFunc = () => self.loadVideo(manifest_url);

          // Stop loading of search, loadFunc will start the loading for the video
          self.hideLoading("loadingdiv", "searchdiv");

          if (!qualities) {
            self.setState({ mediaURL: manifest_url }, loadFunc);
          } else {
            self.setState({ mediaURL: manifest_url, qualities: qualities }, loadFunc);
          }
      });


      // Probably within an on connect?
      console.log("Set up socket stream listener");
    }

    private getSocket() {
      return this.props.socket ? this.props.socket : io('https://polyglot-livesubtitles.herokuapp.com/streams');
    }

    public componentDidMount() {

      // set up socket event listener
      // TODO: Grab link and language if we have them, emit socket event and set up socket event listener which will update mediaURLs
      if (this.props.link) {
        console.log("componentDidMount");
        // We came from a link url
        const url: string = decodeURIComponent(this.props.link);
        const lang: string = this.props.lang ? this.props.lang : "";
        // emit socket event
        this.setUpSocketStreamListener(url, lang);
      }

    }

    render() {
      const { classes } = this.props;

      if (this.state.error) {
        return (<PolyglotError error={this.state.error} restoredError={this.restoredError}/>);
      }

      if (this.state.mediaURL) {
        // We have the url, we might/might not have the language, but backend
        // takes care of that
        //return (<VideContent link={this.props.link} lang={this.props.lang ? this.props.lang : ""}/>);
        return (this.getVideoMode(classes, this.state.mediaURL, this.state.qualities));
      }

      return (this.getDefaultMode(classes));
    }

}

export const MainContent = withStyles(styles, {withTheme: true})(MainContentComponent);
