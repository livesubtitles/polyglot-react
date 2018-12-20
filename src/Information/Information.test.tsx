import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Information } from 'src/Information/Information';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Information />, div);
  ReactDOM.unmountComponentAtNode(div);
});
