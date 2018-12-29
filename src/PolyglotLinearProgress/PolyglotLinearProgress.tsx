import * as React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextLoop from "react-text-loop";

export interface PolyglotLinearProgressComponentProps extends WithStyles<typeof styles> {
    value: number;
}

const styles = createStyles({
  root: {
    flexGrow: 1,
    width: "18em",
  },
});

const PolyglotLinearProgressComponent = (props: PolyglotLinearProgressComponentProps) => {
    return (
      <div className={props.classes.root}>
        <Typography style={{display: 'inline-block'}}>{props.value}% &nbsp;</Typography>
        <TextLoop>
          <Typography>Setting up video player...</Typography>
          <Typography>Sending video to server...</Typography>
          <Typography>Extracting audio from video...</Typography>
          <Typography>Transcribing audio...</Typography>
          <Typography>Translating transcription...</Typography>
          <Typography>Generating subtitles...</Typography>
          <Typography>Buffering...</Typography>
        </TextLoop>
        <LinearProgress value={props.value} variant={"determinate"} />
      </div>
    );
}

export const PolyglotLinearProgress = withStyles(styles)(PolyglotLinearProgressComponent);
