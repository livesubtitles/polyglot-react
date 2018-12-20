import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SubtitleLanguageDropdown } from 'src/SubtitleLanguageDropdown/SubtitleLanguageDropdown';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubtitleLanguageDropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});
