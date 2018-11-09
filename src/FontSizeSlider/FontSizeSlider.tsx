import * as React from 'react';
import Slider from '@material-ui/lab/Slider';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

export interface FontSizeSliderProps extends WithStyles<typeof styles> {
    onFontSizeChange(size: number): void;
}

interface FontSizeSliderState {
  size: number;
}

const styles = createStyles({
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
});

const DEFAULT_SIZE: number = 12;

class FontSizeSliderComponent extends React.Component<FontSizeSliderProps, FontSizeSliderState> {
    constructor(props: FontSizeSliderProps) {
        super(props);
        this.state = {
          size: DEFAULT_SIZE
        }
    }

    private handleChange = (event, value) => {
      this.setState({ size: value });
      this.props.onFontSizeChange(value);
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            Font size: {this.state.size}
            <Slider
              classes={{ container: classes.slider }}
              value={this.state.size}
              min={8}
              max={28}
              step={1}
              onChange={this.handleChange}
            />
          </div>
        );
    }
}

export const FontSizeSlider = withStyles(styles)(FontSizeSliderComponent);
