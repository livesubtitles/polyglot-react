import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LanguageAutocomplete />, div);
  ReactDOM.unmountComponentAtNode(div);
});
