import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainContent } from 'src/MainContent/MainContent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainContent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
