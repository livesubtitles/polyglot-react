import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppHeader } from 'src/AppHeader/AppHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
