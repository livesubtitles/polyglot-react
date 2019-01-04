import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { PolyglotErrorType } from "src/utils/interfaces";

export interface PolyglotErrorProps {
    error: PolyglotErrorType;
    restoredError(): void;
}

interface PolyglotErrorState {
  open: boolean;
}

interface ErrorDescription {
  errorText: string;
  buttonText: string;
}

interface ErrorMap {
  [error: string]: ErrorDescription;
}

export class PolyglotError extends React.Component<PolyglotErrorProps, PolyglotErrorState> {

  private static RETRY_BUTTON = "Retry";
  private static BACK_BUTTON  = "Back";

  private static errorMap: ErrorMap = {
    [PolyglotErrorType.UninitialisedStreamer]: {
      errorText: "Server error. Please try again. Error: UninitialisedStreamer.",
      buttonText: PolyglotError.RETRY_BUTTON
    },
    [PolyglotErrorType.StreamlinkUnavailable]: {
      errorText: "Cannot subtitle video. For the list of supported websites, please see https://streamlink.github.io/. Error: StreamlinkUnavailable.",
      buttonText: PolyglotError.BACK_BUTTON
    },
    [PolyglotErrorType.SocketConnection]: {
      errorText: "Error connecting to the socket on the server. Error: SocketConnection.",
      buttonText: PolyglotError.RETRY_BUTTON
    },
    [PolyglotErrorType.MaxTimeExceededLoginRequired]: {
       errorText: "Maximum time without login exceeded. Please log in to continue using Polyglot. Error: MaxTimeExceededLoginRequired.",
       buttonText: PolyglotError.BACK_BUTTON
     },
     [PolyglotErrorType.BufferAppendError]: {
       errorText: "A problem occured with Hls. Please retry. Error: BufferAppendError.",
       buttonText: PolyglotError.RETRY_BUTTON
     }
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    }
  }

 handleClose = () => {
   this.setState({ open: false });
   this.props.restoredError();
 };


  render() {
    return (
      <div>
       <Dialog
         open={this.state.open}
         onClose={this.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">Error</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             {PolyglotError.errorMap[this.props.error].errorText}
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="primary">
             {PolyglotError.errorMap[this.props.error].buttonText}
           </Button>
         </DialogActions>
      </Dialog>
 </div>
    );
  }
}
