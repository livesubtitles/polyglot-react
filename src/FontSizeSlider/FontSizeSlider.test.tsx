import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontSizeSlider } from 'src/FontSizeSlider/FontSizeSlider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FontSizeSlider onFontSizeChange={(n) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
