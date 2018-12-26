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

const INTERVAL_TIME = 10000;
const AutoPlaySwipeableViews = autoPlay(SwipeableViews, 'incremental', INTERVAL_TIME);

export interface InformationProps extends WithStyles<typeof styles>{
  imageWidth?: number
}

interface InformationState {
  slideIndex: number;
}

interface InformationSegment {
  title: string;
  body: string;
}

const informationSegments : InformationSegment[] = [
  {
    title: "What is Polyglot?",
    body: "Polyglot is a hack... I mean subtitling provider for livestreams. \
          For the affordable price of $100 per hour of streaming. You can get half-arsed translations \
          courtesy of Google and Microsoft. i.e companies who know what they are doing."
  },
  {
    title: "What languages are supported?",
    body: "The Polyglot has only been tested with Spanish and French however... in theory \
           it should work for many other languages. We can not be bothered to find people of every language \
           this supports. If you notice an error in the translation.... blame Google."
  },
  {
    title: "What platforms are supported?",
    body: "Polyglot is mainly intended for Youtube; However, we are aiming to make it work for many \
          sites such as Twitch, BBC iPlayer and Chaturbate. In theory, it would for for any website \
          with Streamlink compatibility."
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
    maxWidth: "550px",
    flexGrow: 1,
  },
  title: {
    display: "flex",
    alignItems: "center",
    height: "50px"
  }
});

class InformationComponent extends React.Component<InformationProps & WithTheme, InformationState> {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  public handleNext = () => {
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
        <img src={Logo} width={this.props.imageWidth ? this.props.imageWidth.toString() + "px" : "250px"}/>
        <div className={classes.stepper}>
        <Card className={classes.stepperCard}>
        <CardContent>
        <Typography variant="h5">{informationSegments[slideIndex].title}</Typography>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={slideIndex}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {informationSegments.map((step, index) => (
            <div key={step.title}>
              {Math.abs(slideIndex - index) <= 2 ? (
                <Typography variant="h6">{step.body}</Typography>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        </CardContent>
        <MobileStepper
          steps={maxIndex}
          position="static"
          activeStep={slideIndex}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={slideIndex === maxIndex - 1}
            id="next-button"
            >
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={slideIndex === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
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

export const Information = withStyles(styles, {withTheme : true})(InformationComponent);
