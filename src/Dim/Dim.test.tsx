import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dim } from 'src/Dim/Dim';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dim />, div);
  ReactDOM.unmountComponentAtNode(div);
});
