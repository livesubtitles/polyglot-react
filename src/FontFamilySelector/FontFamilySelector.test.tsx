import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontFamilySelector } from 'src/FontFamilySelector/FontFamilySelector';
import * as TestRenderer from 'react-test-renderer';
import { Select } from '@material-ui/core';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FontFamilySelector onFontSelection={(s) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("changing the font", () => {
  const mockfn = jest.fn();
  const instance = TestRenderer.create(
                      <FontFamilySelector onFontSelection={mockfn}/>
                   ).root;
  const dummyFont = "DUMMY_FONT"
  const event = {target: {value: dummyFont}};

  const select = instance.findByType(Select);
  select.props.onChange(event);

  expect(mockfn.mock.calls).toEqual([[dummyFont]]);
});