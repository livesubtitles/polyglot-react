import * as React from 'react';
import "src/commonCSS.css";
import { UrlInput } from 'src/UrlInput/UrlInput';
import { postJSON } from 'src/utils/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProcessResponse, InitialStreamPostArguments } from "src/utils/interfaces";

const SERVER_URL = "https://vast-plains-75205.herokuapp.com";

interface MainContentProps {}

interface MainContentState {
    loading: boolean;
}

export class MainContent extends React.Component<MainContentProps, MainContentState> {
    constructor(props: MainContentProps) {
        super(props);
        this.state = {
          loading: false
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    private async handleSearch(search: string): Promise<void> {
      console.log(search);
      this.setState({ loading: true });
      const postPayload: InitialStreamPostArguments = { url: search, lang: "es-ES" };
      const res: ProcessResponse = await postJSON<ProcessResponse, InitialStreamPostArguments>(SERVER_URL, "stream", postPayload);
      console.log(res);
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return (<CircularProgress/>);
      }
      return (
        <div className="centerFlex">
          <UrlInput onSearch={this.handleSearch}/>
        </div>);
    }

}
