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
    
  }
});

interface StepInfo {
  title: string;
  description: string; 
}

const steps : StepInfo[] = [
  { title: "Step 1", description: "Description for step 1" },
  { title: "Step 2", description: "Description for step 2" },
  { title: "Step 3", description: "Descrpition for step 3" },
];

class HelpComponent extends React.Component<HelpProps, HelpState> {
  constructor(props: HelpProps) {
    super(props);
    this.state = {
      step: 0
    };
  }

  private getSteps = () => {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
  }

  private getStepContent = (step : number) => {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
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
        <Stepper activeStep={step} orientation="vertical">
          {steps.map((stepInfo : StepInfo, index) => {
            return (
              <Step key={stepInfo.title}>
                <StepLabel>{stepInfo.title}</StepLabel>
                <StepContent>
                  <Typography>{stepInfo.description}</Typography>
                  <div>
                    <div>
                      <Button
                        disabled={step === 0}
                        onClick={this.handlePrev}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                      >
                        {step === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {step === steps.length && (
          <Paper square elevation={0}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
);
  }

}

export const Help = withStyles(styles)(HelpComponent);