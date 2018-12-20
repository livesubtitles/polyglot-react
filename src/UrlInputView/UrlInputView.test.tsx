import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UrlInputView } from 'src/UrlInputView/UrlInputView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UrlInputView onChange={(e) => {}} isErrorURL={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
