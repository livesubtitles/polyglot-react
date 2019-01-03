import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Information, InformationComponent, AutoPlaySwipeableViews } from 'src/Information/Information';
import * as enzyme from 'enzyme';
import Button from '@material-ui/core/Button';


it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Information />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe("mobile stepper", () => {
  
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

describe("AutoPlaySwipeableViews testing", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = enzyme.shallow(<Information/>).dive();
  });

  it("test change index", () => {
    const swipableView = wrapper.find(AutoPlaySwipeableViews);
    expect(swipableView).toHaveLength(1);
    swipableView.prop("onChangeIndex")(1);
    expect(wrapper.state('slideIndex')).toBe(1);
  });
});