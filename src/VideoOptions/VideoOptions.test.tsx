import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { VideoOptions } from 'src/VideoOptions/VideoOptions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VideoOptions qualities={["144, 360"]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
