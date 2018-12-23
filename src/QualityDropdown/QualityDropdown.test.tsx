import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QualityDropdown } from 'src/QualityDropdown/QualityDropdown';
import * as enzyme from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QualityDropdown qualities={["144", "360"]} onQualitySelection={(q) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("behaviour tests",() => {
  let wrapper;
  let mockfn;
  const dummyQualities = ["144", "360", "480"];
  
  beforeEach(() => {
    mockfn = jest.fn();
    wrapper = 
      enzyme.shallow(<QualityDropdown onQualitySelection={mockfn} qualities={dummyQualities} />).dive();
  });

  it("correct number of menu items", () => {
    const menuItems = wrapper.find(MenuItem);
    expect(menuItems).toHaveLength(dummyQualities.length);
  }); 


});