import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Search } from 'src/Search/Search';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Search onSearch={(s, l) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
