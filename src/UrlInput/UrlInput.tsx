import * as React from 'react';
import { UrlInputView } from 'src/UrlInputView/UrlInputView';

export interface UrlInputProps {
  onSearch(search: string): void;
}

interface UrlInputState {
    search: string;
}

export class UrlInput extends React.Component<UrlInputProps, UrlInputState> {
    constructor(props: UrlInputProps) {
        super(props);
        this.state = {
            search: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    private handleChange(event): void {
      this.setState({search: event.target.value});
    }

    private handleButtonClick(event: Event): void {
      this.props.onSearch(this.state.search);
    }

    render() {
        return (
            <UrlInputView onChange={this.handleChange} onButtonClick={this.handleButtonClick}/>
        );
    }

}
