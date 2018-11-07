import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PolyglotErrorType } from "src/utils/interfaces";

export interface PolyglotErrorProps {
    error: PolyglotErrorType;
    restoredError(): void;
}

interface PolyglotErrorState {
  open: boolean;
}

interface ErrorMap {
  [error: string]: string;
}

export class PolyglotError extends React.Component<PolyglotErrorProps, PolyglotErrorState> {

  private static errorMap: ErrorMap = {
    [PolyglotErrorType.UninitialisedStreamer]: "Server error. Please try again. Error: UninitialisedStreamer.",
    [PolyglotErrorType.StreamlinkUnavailable]: "Cannot subtitle video. For the list of supported websites, please see X. Error: StreamlinkUnavailable.",
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
         <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             {PolyglotError.errorMap[this.props.error]}
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} color="primary">
             Retry
           </Button>
         </DialogActions>
      </Dialog>
 </div>
    );
  }
}
