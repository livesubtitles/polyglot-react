import * as React from 'react';
import { UrlInputView } from 'src/UrlInputView/UrlInputView';
import { LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchProps {
    onSearch(search: string, lang: string): void;
}

interface SearchState {
    search: string;
    lang: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            lang: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    private handleChange(event): void {
      console.log("Change: " + event.target.value);
      this.setState({search: event.target.value});
    }

    private handleButtonClick(event) {
      if (this.state.search === "") {
        // Show warning
        return;
      }

      if (this.state.lang === "") {
        // Show warning
        return;
      }

      this.props.onSearch(this.state.search, this.state.lang);
    }


    render() {
        return (
            <div>
              <UrlInputView onChange={this.handleChange} />
              <LanguageAutocomplete />
              <IconButton onClick={this.handleButtonClick}><SearchIcon /></IconButton>
            </div>

        );
    }

}
