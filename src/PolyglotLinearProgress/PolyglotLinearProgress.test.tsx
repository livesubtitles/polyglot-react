import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PolyglotLinearProgress } from 'src/PolyglotLinearProgress/PolyglotLinearProgress';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PolyglotLinearProgress value={50}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
