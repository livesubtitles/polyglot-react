import * as React from 'react';
import "src/commonCSS.css";
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

const SERVER_URL = "https://polyglot-livesubtitles.herokuapp.com/";

interface MainContentState {
    loading: boolean;
    error: PolyglotErrorType;
}

export class MainContent extends React.Component<URLParams, MainContentState> {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: null,
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

    render() {
      if (this.state.loading) {
        return (<CircularProgress/>);
      }

      if (this.state.error) {
        return (<PolyglotError error={this.state.error} restoredError={this.restoredError}/>);
      }

      if (this.props.lang) {
        // We have link and language, go to video directly
        return (<div>Link AND Language case</div>);
      }

      if (this.props.link) {
        // We only have the url
        return (<div>Link case</div>);
      }

      return (
        <div className="flexListRoot">
          <Search onSearch={this.handleSearch} />
        </div>);
    }

}
