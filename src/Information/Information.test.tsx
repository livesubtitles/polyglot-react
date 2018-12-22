import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Information } from 'src/Information/Information';
import * as enzyme from 'enzyme';
import Button from '@material-ui/core/Button';

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Information />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Button testing", () => {
  
  let instance;

  beforeEach(() => {
    instance = enzyme.mount(<Information/>);
  });


  it("two-buttons test", () => {
    // ONLY USE MOUNT IF NOT SHALLOW RENDERING - need to go deep because of mobile stepper
    const buttons = instance.find(Button);
    expect(buttons.length).toBe(2);
  });

  // Other tests handled in the mobile stepper
});