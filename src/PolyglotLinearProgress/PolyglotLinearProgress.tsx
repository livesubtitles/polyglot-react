import * as React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
        <Typography>{props.value}%</Typography>
        <LinearProgress value={props.value} variant={"determinate"} />
      </div>
    );
}

export const PolyglotLinearProgress = withStyles(styles)(PolyglotLinearProgressComponent);
