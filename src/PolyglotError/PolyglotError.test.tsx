import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PolyglotErrorType } from "src/utils/interfaces";
import { PolyglotError } from 'src/PolyglotError/PolyglotError';
import * as TestRenderer from 'react-test-renderer';
import { Select } from '@material-ui/core';


it('renders for each type of error without crashing', () => {
  [
    PolyglotErrorType.SocketConnection, 
    PolyglotErrorType.StreamlinkUnavailable,
    PolyglotErrorType.UninitialisedStreamer
  ].map(error => {
    const div = document.createElement('div');
    ReactDOM.render(<PolyglotError error={error} restoredError={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});