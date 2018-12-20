import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PolyglotErrorType } from "src/utils/interfaces";
import { PolyglotError } from 'src/PolyglotError/PolyglotError';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PolyglotError error={PolyglotErrorType.StreamlinkUnavailable} restoredError={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
