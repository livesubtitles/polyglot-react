import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

export interface QualityDropdownProps extends WithStyles<typeof styles> {
  onQualitySelection(quality: string): void;
}

interface QualityDropdownState {
    quality: string;
}

const DEFAULT_QUALITY = "360";

const styles = theme => createStyles({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

type Quality = string;

export class QualityDropdownComponent extends React.Component<QualityDropdownProps, QualityDropdownState> {

    private static qualities: Quality[] = ["144", "240", "360", "480", "720", "1080"];

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
      for (const key of Object.keys(QualityDropdownComponent.qualities)) {
        const q: Quality = QualityDropdownComponent.qualities[key];
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
