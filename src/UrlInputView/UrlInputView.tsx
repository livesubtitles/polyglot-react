import * as React from 'react';
import TextField from "@material-ui/core/TextField";

export interface UrlInputViewProps {
  onChange(event): void;
}

export const UrlInputView: React.SFC<UrlInputViewProps> = (props: UrlInputViewProps) => {
    return (
            <TextField label="Link to video" onChange={props.onChange}/>
    );
}
