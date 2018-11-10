import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

export interface FontFamilySelectorProps extends WithStyles<typeof styles> {
  onFontSelection(fontFamily: string): void;
}

interface FontFamilySelectorState {
    fontFamily: string;
}

const DEFAULT_FONT_FAMILY = "Roboto";

const styles = theme => createStyles({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

export class FontFamilySelectorComponent extends React.Component<FontFamilySelectorProps, FontFamilySelectorState> {

    private static fontFamilies = {
      "Lato": <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"/>,
      "Spicy Rice": <link href="https://fonts.googleapis.com/css?family=Spicy+Rice" rel="stylesheet"/>,
      "Roboto": <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>,
      "Roboto Mono": <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet"/>,
      "Lobster": <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet"/>,
      "Pacifico": <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet"/>,
      "Mali": <link href="https://fonts.googleapis.com/css?family=Mali" rel="stylesheet"/>,
      "Kanit": <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet"/>,
      "Cairo": <link href="https://fonts.googleapis.com/css?family=Cairo" rel="stylesheet"/>
    }

    constructor(props: FontFamilySelectorProps) {
        super(props);
        this.state = {
            fontFamily: DEFAULT_FONT_FAMILY
        };

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange = event => {
      this.setState({ fontFamily: event.target.value });
      console.log(typeof FontFamilySelectorComponent.fontFamilies);
      this.props.onFontSelection(event.target.value);
    }

    private getScripts() {
      const scripts = [];
      for (const key of Object.keys(FontFamilySelectorComponent.fontFamilies)) {
        scripts.push(FontFamilySelectorComponent.fontFamilies[key]);
      }
      return scripts;
    }

    private generateFontFamilyOptions() {
      const items = [];
      let count = 0;
      for (const key of Object.keys(FontFamilySelectorComponent.fontFamilies)) {
        const fontFamilyStyle: React.CSSProperties = {fontFamily: key}
        items.push(<MenuItem key={count} value={key}><span style={fontFamilyStyle}>{key}</span></MenuItem>);
        count += 1;
      }
      return items;
    }

    render() {

        const { classes } = this.props;

        return (
          <React.Fragment>
          {...this.getScripts()}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="font-family-id">Font Family</InputLabel>
            <Select
              value={this.state.fontFamily}
              onChange={this.handleChange}
              inputProps={{
                name: 'font-family',
                id: 'font-family-id',
              }}
            >
              {...this.generateFontFamilyOptions()}

            </Select>
      </FormControl>
      </React.Fragment>
        );
    }
}

export const FontFamilySelector = withStyles(styles)(FontFamilySelectorComponent);
