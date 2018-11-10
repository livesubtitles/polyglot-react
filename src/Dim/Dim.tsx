import * as React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface ToggleButtonsComponentState {
  dim: boolean;
}

const styles = theme => createStyles({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

class ToggleButtonsComponent extends React.Component<WithStyles<typeof styles>, ToggleButtonsComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      dim: false,
    };

    this.handleDim = this.handleDim.bind(this);
  }

  private handleDim = (event, dim: boolean) => this.setState({ dim: dim });

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item xs={6} sm={12}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={this.state.dim} exclusive onChange={this.handleDim}>
              <ToggleButton value={false}>
                OFF
              </ToggleButton>
              <ToggleButton value={true}>
                ON
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Typography variant="caption" gutterBottom>
            Dim
          </Typography>
        </Grid>
      </Grid>
    );
  }
}


export const ToggleButtons = withStyles(styles)(ToggleButtonsComponent);
