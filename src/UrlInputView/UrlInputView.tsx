import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from  '@material-ui/icons/Link'

export interface UrlInputViewProps {
  onChange(event): void;
  isErrorURL: boolean
}

export const UrlInputView: React.SFC<UrlInputViewProps> = (props: UrlInputViewProps) => {
  const label = props.isErrorURL ? "Please enter a valid url" : "Link to video";
  return (
    <TextField error={props.isErrorURL} 
      label={label}
      onChange={props.onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Link/>
          </InputAdornment>
        ),
      }}
      />
  );
}
