import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PolyglotErrorType } from "src/utils/interfaces";
import { PolyglotError } from 'src/PolyglotError/PolyglotError';
import * as enzyme from 'enzyme';
import Button from '@material-ui/core/Button';

it('renders for each type of error without crashing', () => {
  [
    PolyglotErrorType.SocketConnection, 
    PolyglotErrorType.StreamlinkUnavailable,
    PolyglotErrorType.UninitialisedStreamer
  ].map(error => {
    const div = document.createElement('div');
    ReactDOM.render(<PolyglotError error={error} restoredError={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

it('close button', () => {
  const mockfn = jest.fn();
  const instance = enzyme.shallow(<PolyglotError error={PolyglotErrorType.SocketConnection} restoredError={mockfn}/>);
  const button  = instance.find(Button);
  button.simulate('click');
  expect(mockfn.mock.calls.length).toBe(1);
});