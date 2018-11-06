import * as React from 'react';
import { UrlInputView } from 'src/UrlInputView/UrlInputView';
import { LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { LanguageSuggestion } from "src/utils/interfaces";

export interface SearchProps {
    onSearch(search: string, lang: LanguageSuggestion): void;
}

interface SearchState {
    search: string;
    lang: LanguageSuggestion;
    langText: string;
    isErrorURL: boolean;
    isErrorSuggestion: boolean;
}

export class Search extends React.Component<SearchProps, SearchState> {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            lang: null,
            langText: "",
            isErrorSuggestion: false,
            isErrorURL: false
        };

        this.handleChangeURL = this.handleChangeURL.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
        this.handleChangeValueSuggestion = this.handleChangeValueSuggestion.bind(this);
    }

    private handleChangeURL(event): void {
      this.setState({search: event.target.value, isErrorURL: false});
    }

    private handleSuggestionSelected(event, { suggestion }): void {
      this.setState({ lang: suggestion });
    }

    private handleChangeValueSuggestion(langText: string) {
      this.setState({ langText, isErrorSuggestion: false });
    }

    private handleButtonClick(event) {
      if (this.state.search === "") {
        // Show warning
        this.setState({isErrorURL: true});
        return;
      }

      if (this.state.lang === null || this.state.lang.label !== this.state.langText) {
        // if the language is not there or the language selected is different
        // from the choices in the suggestions, error
        // Show warning
        this.setState({isErrorSuggestion: true});
        return;
      }

      this.props.onSearch(this.state.search, this.state.lang);
    }


    render() {
        return (
            <div>
              <UrlInputView isErrorURL={this.state.isErrorURL} onChange={this.handleChangeURL} />
              <LanguageAutocomplete
                isErrorSuggestion={this.state.isErrorSuggestion}
                onSuggestionSelected={this.handleSuggestionSelected}
                onChangeValue={this.handleChangeValueSuggestion}
              />
              <IconButton onClick={this.handleButtonClick}><SearchIcon /></IconButton>
            </div>

        );
    }

}
