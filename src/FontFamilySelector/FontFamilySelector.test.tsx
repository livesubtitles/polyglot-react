import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontFamilySelector } from 'src/FontFamilySelector/FontFamilySelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FontFamilySelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
