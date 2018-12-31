import * as React from 'react';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export interface HelpProps extends WithStyles<typeof styles> {
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

const steps : StepInfo[] = [
  { 
    title: "Browser", 
    description: 
    <Typography variant="body1">
      Please make sure that you are using Google Chrome if you have not been \
      redirected from the Polyglot extension
    </Typography> 
  },
  { 
    title: "Sign In", 
    description:
    <Typography variant="body1">
      You will be entitled to up to one hour of free live subtitle streaming. After this, you will \
      need to sign in to your Google account to pay for exactly as much as you need.
    </Typography>
  },
  {
     title: "Finding the livesteam",
     description: 
     <Typography variant="body1">
       Polyglot was initially designed to support YouTube live streams. However, it should work \
       Twitch and BBC iPlayer. Please refer to this list of websites that are compatible with Streamlink \
       [insert-link-here]
     </Typography>
  },{
    title: "Get live subtitles",
    description:
    <Typography variant="body1">
      Navigate to the home page with the sidebar to the left. And enter the link to the live stream souce \
      and the language which the stream is in.
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

  private handleReset = () => {
    this.setState({step: 0});
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
                        disabled={step === 0}
                        onClick={this.handlePrev}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
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
            <Button onClick={this.handleReset}
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