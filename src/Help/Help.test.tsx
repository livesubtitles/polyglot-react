import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as enzyme from "enzyme";
import { Help, steps } from 'src/Help/Help';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from "@material-ui/core/Button";


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Help onFinish={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Step tests", () => {

  it("Clicking on button goes to the next step", () => {
      const wrapper = enzyme.shallow(<Help onFinish={() => {}} />).dive();

      const steplist = wrapper.find(Step);
      expect(steplist).toHaveLength(steps.length);

      const stepper = wrapper.find(Stepper);
      expect(stepper.props().activeStep).toBe(0);

      const backBrowserButton = wrapper.find('#back-Browser').find(Button);
      expect(backBrowserButton).toHaveLength(1);
      expect(backBrowserButton.props().disabled).toBe(true);
      const nextBrowserButton = wrapper.find("#next-Browser").find(Button);
      expect(nextBrowserButton).toHaveLength(1);
      expect(nextBrowserButton.props().disabled).toBeUndefined();
      nextBrowserButton.props().onClick();

      wrapper.update();
      expect(wrapper.state().step).toBe(1);

      const backPaymentButton = wrapper.find('#back-Payment').find(Button);
      expect(backPaymentButton).toHaveLength(1);
      backPaymentButton.props().onClick();

      wrapper.update();
      expect(wrapper.state("step")).toBe(0);
  });

  function findButtonAndClick(wrapper, buttonId: string) {
    wrapper.find(buttonId).find(Button).props().onClick();
  }

  it("Clicking on last button calls onFinish", () => {
    const mockfn = jest.fn();
    const wrapper = enzyme.shallow(<Help onFinish={mockfn} />).dive();

    for (const i in steps) {
      // replace whitespaces, otherwise not valid id
      findButtonAndClick(wrapper, `#next-${steps[i].title}`.replace(/\s/g,''));
      wrapper.update();
    }

    wrapper.update();
    expect(wrapper.state().step).toBe(4);
    const tryitout = wrapper.find('#tryitout').find(Button);
    tryitout.props().onClick();
    expect(mockfn).toHaveBeenCalledTimes(1);
  });

});
