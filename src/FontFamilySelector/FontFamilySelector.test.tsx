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

let mockfn;
let instance;

beforeEach(() => {
  mockfn = jest.fn();
  instance = TestRenderer.create(
    <FontFamilySelector onFontSelection={mockfn}/>
 ).root;
});

it("changing the font", () => {
  const dummyFont = "DUMMY_FONT"
  const event = {target: {value: dummyFont}};

  const select = instance.findByType(Select);
  select.props.onChange(event);

  expect(mockfn.mock.calls).toEqual([[dummyFont]]);
});

it("default font is defined", () => {
  const DEFAULT_FONT = "Roboto";
  const select = instance.findByType(Select);
  expect(select.props.value).toBe(DEFAULT_FONT);
});