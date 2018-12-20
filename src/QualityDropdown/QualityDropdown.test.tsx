import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QualityDropdown } from 'src/QualityDropdown/QualityDropdown';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QualityDropdown qualities={["144", "360"]} onQualitySelection={(q) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
