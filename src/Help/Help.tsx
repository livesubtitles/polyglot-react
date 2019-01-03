import * as React from 'react';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export interface HelpProps extends WithStyles<typeof styles> {
  onFinish() : void;
}

interface HelpState {
  step: number;
}

const styles = createStyles({
  root: {
    width: "60%"
  },
  button: {
    marginTop: "10px",
    marginBottom: "10px"
  },
  actions: {
    marginBottom: "10px"
  },
  finish: {
    padding: "15px"
  }
});

interface StepInfo {
  title: string;
  description: JSX.Element;
}

export const steps : StepInfo[] = [
  {
    title: "Browser",
    description:
    <Typography variant="body1">
      If you haven't been redirected from the Polyglot Google Chrome web extension,
      make sure you are using Google Chrome. Polyglot is designed with Google Chrome in mind
      and may not be compatible with other browsers.
    </Typography>
  },
  {
    title: "Payment",
    description:
    <React.Fragment>
      <Typography variant="body1">
        You will be entitled to up to one hour of free live subtitle streaming. After this, you can
        pay for exactly as much as you need through the following methods:
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="Pay for your API using Google Pay"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Login to your Google account and use your own Google Translate API credit"
          />
        </ListItem>
      </List>
    </React.Fragment>
  },
  {
     title: "Finding the live stream",
     description:
     <Typography variant="body1">
       Polyglot was initially designed to support YouTube live streams. However, it can also work for
       Twitch and BBC iPlayer. Any platform supported by Streamlink should also be compatable. Please
       refer to this list <a href="https://streamlink.github.io/plugin_matrix.html#plugin-matrix">here</a> and try it out!
     </Typography>
  },{
    title: "Get live subtitles",
    description:
    <Typography variant="body1">
      Navigate to the home page with the sidebar to the left. And enter the link to the live stream souce \
      and the language which the stream is in and go!
    </Typography>
  }
];

class HelpComponent extends React.Component<HelpProps, HelpState> {
  constructor(props: HelpProps) {
    super(props);
    this.state = {
      step: 0
    };
  }

  private handleNext = () => {
    this.setState(prevState => ({
      step: prevState.step + 1
    }));
  };

  private handlePrev = () => {
    this.setState(prevState => ({
      step: prevState.step - 1
    }))
  };

  render() {
    const { classes } = this.props;
    const { step } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Instructions
        </Typography>
        <Stepper activeStep={step} orientation="vertical">
          {steps.map((stepInfo : StepInfo, index) => {
            return (
              <Step key={stepInfo.title}>
                <StepLabel><Typography variant="h6">{stepInfo.title}</Typography></StepLabel>
                <StepContent>
                  {stepInfo.description}
                  <div className={classes.actions}>
                    <div>
                      <Button
                        id={`back-${stepInfo.title}`.replace(/\s/g,'')}
                        disabled={step === 0}
                        onClick={this.handlePrev}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        id={`next-${stepInfo.title}`.replace(/\s/g,'')}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {step === steps.length && (
          <Paper square elevation={0} className={classes.finish}>
            <Button id="tryitout" onClick={this.props.onFinish}
                    className={classes.button}>
              Try it now!
            </Button>
          </Paper>
        )}
      </div>
);
  }

}

export const Help = withStyles(styles)(HelpComponent);
