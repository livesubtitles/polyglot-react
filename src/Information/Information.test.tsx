import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Information, InformationComponent, NUMBER_OF_ITERATION_SEGMENTS } from 'src/Information/Information';
import * as enzyme from 'enzyme';
import Button from '@material-ui/core/Button';

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Information />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("behaviour tests", () => {
  
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
  it("forward and backward buttons", () => {
    // initially at 0
    expect(instance.find(InformationComponent).state('slideIndex')).toBe(0);

    const nextButton = instance.find('[id="next-button"]').find(Button);
    nextButton.simulate('click');
    expect(instance.find(InformationComponent).state('slideIndex')).toBe(1);

    const prevButton = instance.find('[id="prev-button"]').find(Button);
    prevButton.simulate('click');
    expect(instance.find(InformationComponent).state('slideIndex')).toBe(0);
  });
});