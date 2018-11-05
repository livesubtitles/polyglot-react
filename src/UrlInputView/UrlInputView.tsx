import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export interface UrlInputViewProps {
  onChange(event): void;
  onButtonClick(event): void;
}

export const UrlInputView: React.SFC<UrlInputViewProps> = (props: UrlInputViewProps) => {
    return (
        <div>
            <TextField onChange={props.onChange}/>
            <IconButton onClick={props.onButtonClick}><SearchIcon /></IconButton>
        </div>
    );
}