import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontSizeSlider } from 'src/FontSizeSlider/FontSizeSlider';
import * as enzyme from 'enzyme';
import Slider from '@material-ui/lab/Slider';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FontSizeSlider onFontSizeChange={(n) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("behaviour tests", () => {
  let wrapper;
  const mockfn = jest.fn();

  beforeEach(() => {
    wrapper = enzyme.shallow(<FontSizeSlider onFontSizeChange={mockfn}/>).dive();
  });

  afterEach(() => {
    mockfn.mockClear();
  });

  it("can change size", () => {
    const slider = wrapper.find(Slider);
    const dummyVal = 45;
    slider.simulate("change", {}, dummyVal);
    expect(mockfn).toBeCalledTimes(1);
    expect(mockfn.mock.calls[0][0]).toEqual(dummyVal);
  });
});