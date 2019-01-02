import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Help } from 'src/Help/Help';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Help onFinish={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
