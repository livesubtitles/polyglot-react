import * as React from 'react';
import { postJSON } from 'src/utils/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  ProcessResponse,
  InitialStreamPostArguments,
  LanguageSuggestion,
  PolyglotErrorType,
  URLParams } from "src/utils/interfaces";
import { Search } from "src/Search/Search";
import { PolyglotError } from "src/PolyglotError/PolyglotError";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";


const SERVER_URL = "https://polyglot-livesubtitles.herokuapp.com/";

interface MainContentState {
    loading: boolean;
    error: PolyglotErrorType;
}

const styles = theme => createStyles({
  root: {
    height: "100%",
    display: "flex",
    textAlign: "center"
  },
  side: {
    backgroundColor: "#555555",
    flex: "0 0 17em",
  },
  centre: {
    height: "100%",
    flex: "1",
  }
});

class MainContentComponent extends React.Component<WithStyles<typeof styles> & URLParams, MainContentState> {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: null,
          mediaUrl: null,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.restoredError = this.restoredError.bind(this);
    }

    private displayError(error: PolyglotErrorType) {
      this.setState({error: error});
    }

    private restoredError() {
      this.setState({error: null});
    }

    private async handleSearch(search: string, lang: LanguageSuggestion): Promise<void> {
      console.log(search);
      console.log(lang);
      this.setState({ loading: true });
      const postPayload: InitialStreamPostArguments = { url: search, lang: lang.value };
      const res: ProcessResponse = await postJSON<ProcessResponse, InitialStreamPostArguments>(SERVER_URL, "stream", postPayload);
      if (res.error) {
        this.displayError(res.error);
      }
      console.log(res);
      this.setState({ loading: false });
    }

    // public componentDidMount() {
    //   if (this.props.link) {
    //     //TODO: Emit socket event in order to obtain media url
    //     this.setState({ loading: true});
    //     const res =
    //     this.setState({ loading: false});
    //   }
    // }

    render() {
      const { classes } = this.props;

      // TODO: Style this to appear in the center
      if (this.state.loading) {
        return (<CircularProgress/>);
      }

      if (this.state.error) {
        return (<PolyglotError error={this.state.error} restoredError={this.restoredError}/>);
      }

      if (this.props.link) {
        // We have the url, we might/might not have the language, but backend
        // takes care of that
        //return (<VideContent link={this.props.link} lang={this.props.lang ? this.props.lang : ""}/>);
      }

      return (
        <div className={classes.root}>
          <div className={classes.side}>
          {/*
             LEFT SIDE 
          */}
          </div>
          <div className={classes.centre}>
            <Search onSearch={this.handleSearch} />
          </div>
          <div className={classes.side}>
          {/*
             LEFT SIDE 
          */}
          </div>
        </div>
      );
    }

}

export const MainContent = withStyles(styles)(MainContentComponent);
