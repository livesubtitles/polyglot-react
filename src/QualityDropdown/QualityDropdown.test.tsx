import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QualityDropdown } from 'src/QualityDropdown/QualityDropdown';
import * as enzyme from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QualityDropdown qualities={["144", "360"]} onQualitySelection={(q) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("behaviour tests",() => {
  let wrapper;
  let mockfn = jest.fn();;
  const dummyQualities = ["144", "360", "480"];
  
  beforeEach(() => {
    wrapper = 
      enzyme.shallow(<QualityDropdown onQualitySelection={mockfn} qualities={dummyQualities} />).dive();
  });

  afterEach(() => {
    mockfn.mockClear();
  });

  it("correct number of menu items", () => {
    const menuItems = wrapper.find(MenuItem);
    expect(menuItems).toHaveLength(dummyQualities.length);
  }); 

  it("selection of qualities", () => {
    const select  = wrapper.find(Select);
    const dummyQuality = "480";
    const mockEvent = {target: {value: dummyQuality}};
    select.simulate("change", mockEvent);
    expect(mockfn).toBeCalledTimes(1);
    expect(mockfn.mock.calls[0][0]).toEqual(dummyQuality);
  });

});