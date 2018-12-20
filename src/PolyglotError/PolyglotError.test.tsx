import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PolyglotError } from 'src/PolyglotError/PolyglotError';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PolyglotError />, div);
  ReactDOM.unmountComponentAtNode(div);
});
