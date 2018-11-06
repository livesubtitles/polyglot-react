import * as React from 'react';
import "src/commonCSS.css";
import { postJSON } from 'src/utils/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProcessResponse, InitialStreamPostArguments } from "src/utils/interfaces";
import { Search } from "src/Search/Search";
import { LanguageSuggestion } from "src/utils/interfaces";

const SERVER_URL = "https://vast-plains-75205.herokuapp.com";

interface MainContentState {
    loading: boolean;
}

export class MainContent extends React.Component<{}, MainContentState> {
    constructor(props) {
        super(props);
        this.state = {
          loading: false
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    private async handleSearch(search: string, lang: LanguageSuggestion): Promise<void> {
      console.log(search);
      console.log(lang);
      this.setState({ loading: true });
      const postPayload: InitialStreamPostArguments = { url: search, lang: lang.value };
      const res: ProcessResponse = await postJSON<ProcessResponse, InitialStreamPostArguments>(SERVER_URL, "stream", postPayload);
      console.log(res);
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return (<CircularProgress/>);
      }
      return (
        <div className="flexListRoot">
          <Search onSearch={this.handleSearch} />
        </div>);
    }

}
