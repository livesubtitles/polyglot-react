import * as React from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { Quality } from "src/utils/interfaces";
import { QualityDropdown } from "src/QualityDropdown/QualityDropdown";

export interface VideoOptionsProps extends WithStyles<typeof styles> {
  onQualitySelection(q: Quality): void;
  qualities: Quality[];
}

const styles = theme => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const VideoOptionsComponent = (props: VideoOptionsProps) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Video Options</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              spacing={24}
           >
           <QualityDropdown qualities={props.qualities} onQualitySelection={props.onQualitySelection} />
          </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
  );
}

export const VideoOptions = withStyles(styles)(VideoOptionsComponent);
