import * as React from 'react';
import TextField from "@material-ui/core/TextField";

export interface UrlInputViewProps {
  onChange(event): void;
  isErrorURL: boolean
}

export const UrlInputView: React.SFC<UrlInputViewProps> = (props: UrlInputViewProps) => {
    if (props.isErrorURL) {
      return (
        <TextField error label="Invalid link to video" onChange={props.onChange}/>
      );
    };

    return (
      <TextField label="Link to video" onChange={props.onChange}/>
    );
}
