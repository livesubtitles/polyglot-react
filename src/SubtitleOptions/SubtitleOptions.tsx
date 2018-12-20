import * as React from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontSizeSlider } from "src/FontSizeSlider/FontSizeSlider";
import { FontFamilySelector } from "src/FontFamilySelector/FontFamilySelector";
import * as ColorPicker from "material-ui-color-picker";
import Grid from '@material-ui/core/Grid';
import { SubtitleLanguageDropdown } from "src/SubtitleLanguageDropdown/SubtitleLanguageDropdown";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";

export interface SubtitleOptionsProps extends WithStyles<typeof styles> {
    onFontSizeChange(n: number): void;
    onFontSelection(nf: string): void;
    onBackgroundColorChange(c: string): void;
    onSubtitleColorChange(c: string): void;
    onSubtitleLanguageChange(l: string): void;
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

const SubtitleOptionsComponent = (props: SubtitleOptionsProps) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Subtitle Options</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              spacing={24}
           >
            <FontSizeSlider onFontSizeChange={props.onFontSizeChange} />
            <FontFamilySelector onFontSelection={props.onFontSelection} />
            <ColorPicker label="Background color" defaultValue="#000000" onChange={props.onBackgroundColorChange} />
            <ColorPicker label="Subtitle color" defaultValue="#000000" onChange={props.onSubtitleColorChange} />
            <SubtitleLanguageDropdown onSubtitleLanguageSelection={props.onSubtitleLanguageChange} />
          </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
  );
}

export const SubtitleOptions = withStyles(styles)(SubtitleOptionsComponent);
