import * as React from 'react'
import Logo from 'src/media/icon_square.png';
import { createStyles, WithStyles, withStyles, Typography, Slide, withTheme, WithTheme } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'

const INTERVAL_TIME = 7500;
export const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface InformationProps extends WithStyles<typeof styles>{
}

interface InformationState {
  slideIndex: number;
}

interface InformationSegment {
  title: string;
  body: JSX.Element;
}


const informationSegments : InformationSegment[] = [
  {
    title: "What languages are supported?",
    body:  <React.Fragment>
            Polyglot supports the translation of 23 different languages including Spanish, French, 
            Korean and Japanese. Polyglot can translate live streams from any supported language
            to any supported language.
           </React.Fragment>
  },
  {
    title: "What platforms are supported?",
    body: <React.Fragment>
            Polyglot was designed in YouTube in mind. However we support many major live streaming 
            platforms, such as Twitch, that are supported by <a href="https://streamlink.github.io/plugin_matrix.html#plugin-matrix">Streamlink</a>.
          </React.Fragment>
  },
  {
    title: "How does this differ from the Chrome extension?",
    body: <React.Fragment>
            You can consider this the 'full version' of Polyglot. You will find the subtitles are 
            more in sync and more customisable in terms of font, color, and size.
          </React.Fragment>
  },
  {
    title: "What browsers are supported?",
    body: <React.Fragment>
            We <b>strongly</b> encourage everyone to use Google Chrome. We cannot guarantee results
            on other browsers.
          </React.Fragment>
  }
];

const styles = createStyles({
  root: {
    padding: "2em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  stepper: {
    padding: "10px"
  },
  stepperCard: {
    maxWidth: "620px",
    flexGrow: 1,
  },
  description: {
    paddingTop: "5px",
  },
  intro: {
    maxWidth: "700px",
    paddingBottom: "20px"
  },
  title: {
    paddingBottom: "20px"
  }
});

export class InformationComponent extends React.Component<InformationProps & WithTheme, InformationState> {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  private handleNext = () => {
    this.setState(prevState => ({
      slideIndex: prevState.slideIndex + 1,
    }));
  };

  private handleBack = () => {
    this.setState(prevState => ({
      slideIndex: prevState.slideIndex - 1,
    }));
  };

  private handleStepChange = slideIndex => {
    this.setState({ slideIndex });
  };

  render() {
    const { classes, theme } = this.props;
    const maxIndex = informationSegments.length;
    const { slideIndex } =  this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>About</Typography>
        <Typography variant="h6" className={classes.intro}>
            Polyglot offers subtitles for foreign live streams. We support many different
            live streaming platforms and languages making foreign entertainment 
            more accessible to everyone. Try up to one hour of translations for <b>Free!</b>
        </Typography>
        <Typography variant="h4">FAQs</Typography>
        <div className={classes.stepper}>
        <Card className={classes.stepperCard}>
        <AutoPlaySwipeableViews
          axis={'x'}
          index={slideIndex}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          interval={INTERVAL_TIME}
        >
          {
            informationSegments.map((step, index) => (
            <div key={step.title}>
              {Math.abs(slideIndex - index) <= 2 ? (
                <CardContent>
                  <Typography variant="h5">{informationSegments[slideIndex].title}</Typography>
                  <Typography variant="h6" className={classes.description}>{step.body}</Typography>
                </CardContent>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxIndex}
          position="static"
          activeStep={slideIndex}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={slideIndex === maxIndex - 1}
            id="next-button"
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={slideIndex === 0}
            id="prev-button">
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Card>
        </div>
      </div>
      );
  }

}

export const Information = withStyles(styles)(InformationComponent);
