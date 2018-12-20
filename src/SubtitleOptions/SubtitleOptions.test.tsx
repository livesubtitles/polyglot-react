import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SubtitleOptions } from 'src/SubtitleOptions/SubtitleOptions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SubtitleOptions
    onFontSizeChange={(n) => {}}
    onFontSelection={(nf) => {}}
    onBackgroundColorChange={(c) => {}}
    onSubtitleColorChange={(c) => {}}
    onSubtitleLanguageChange={(l) => {}}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});
