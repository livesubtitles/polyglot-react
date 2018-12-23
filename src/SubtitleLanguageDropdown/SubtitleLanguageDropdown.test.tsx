import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SubtitleLanguageDropdown } from 'src/SubtitleLanguageDropdown/SubtitleLanguageDropdown';
import * as enzyme from 'enzyme';
import Select from '@material-ui/core/Select';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubtitleLanguageDropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe("behaviour tests", () => {
  let mockfn;
  let wrapper;

  beforeEach(() => {
    mockfn = jest.fn();
    wrapper = enzyme.shallow(<SubtitleLanguageDropdown onSubtitleLanguageSelection={mockfn} />).dive();
  });

  it("test change", () => {
    const dummyLang = "fr-FR";
    const mockEvent = {target: {value: dummyLang}};
    const select = wrapper.find(Select); 
    select.simulate("change", mockEvent);
    expect(mockfn).toHaveBeenCalledTimes(1);
    expect(mockfn.mock.calls[0][0]).toEqual("fr");
  });
});
