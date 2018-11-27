import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Quality } from "src/utils/interfaces";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

export interface QualityDropdownProps extends WithStyles<typeof styles> {
  onQualitySelection(quality: string): void;
  qualities: Quality[];
}

interface QualityDropdownState {
    quality: string;
}

const DEFAULT_QUALITY = "360p";

const styles = theme => createStyles({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

export class QualityDropdownComponent extends React.Component<QualityDropdownProps, QualityDropdownState> {

    constructor(props) {
        super(props);
        this.state = {
            quality: DEFAULT_QUALITY
        };

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange = event => {
      this.setState({ quality: event.target.value });
      this.props.onQualitySelection(event.target.value);
    }

    private generateQualityOptions() {
      const items = [];
      let count = 0;
      for (const q of this.props.qualities) {
        items.push(<MenuItem key={count} value={q}>{q}</MenuItem>);
        count += 1;
      }
      return items;
    }

    render() {

        const { classes } = this.props;

        return (
          <React.Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="quality-dropdown-id">Quality</InputLabel>
            <Select
              value={this.state.quality}
              onChange={this.handleChange}
              inputProps={{
                name: 'quality-dropdown',
                id: 'quality-dropdown-id',
              }}
            >
              {...this.generateQualityOptions()}

            </Select>
      </FormControl>
      </React.Fragment>
        );
    }
}

export const QualityDropdown = withStyles(styles)(QualityDropdownComponent);
