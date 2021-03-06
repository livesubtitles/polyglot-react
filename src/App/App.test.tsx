import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/App/App';
import { MainContent } from "src/MainContent/MainContent";
import * as enzyme from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { Information } from "src/Information/Information";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Main Content tests", () => {
  it("passes link and language correctly to MainContent", () => {
    const LINK = "www.youtube.com";
    const LANG = "Spanish";
    const wrapper = enzyme.shallow(<App link={LINK} lang={LANG} />).dive();
    const mainContent = wrapper.find(MainContent);
    expect(mainContent.props().link).toEqual(LINK);
    expect(mainContent.props().lang).toEqual(LANG);
  });
  
  it("passes link only to MainContent", () => {
    const LINK = "www.youtube.com";
    const wrapper = enzyme.shallow(<App link={LINK} />).dive();
    const mainContent = wrapper.find(MainContent);
    expect(mainContent.props().link).toEqual(LINK);
    expect(mainContent.props().lang).toBeUndefined();
  });
  
  it("passes nothing to MainContent", () => {
    const wrapper = enzyme.shallow(<App />).dive();
    const mainContent = wrapper.find(MainContent);
    expect(mainContent.props().link).toBeUndefined();
    expect(mainContent.props().lang).toBeUndefined();
  });
});

describe("mode switching", () => {
  it("default mode and changing mode", () => {
    const wrapper = enzyme.shallow(<App />).dive();
    // default is MainContent
    expect(wrapper.find(MainContent).exists()).toBe(true);
    const infoButton = wrapper.find('[id="infoButtonApp"]');
    infoButton.find(ListItem).simulate("click");
    expect(wrapper.find(MainContent).exists()).toBe(false);
    expect(wrapper.find(Information).exists()).toBe(true);
    const homeButton = wrapper.find('[id="homeButtonApp"]');
    homeButton.find(ListItem).simulate("click");
    expect(wrapper.find(MainContent).exists()).toBe(true);
    expect(wrapper.find(Information).exists()).toBe(false);
  });

  it("opening and closing sidebar", () => {
    const wrapper = enzyme.shallow(<App />).dive();
    expect(wrapper.state('open')).toEqual(false);
    const openButton = wrapper.find('[id="openDrawerButton"]')
                            .find(IconButton);
    openButton.simulate('click');
    expect(wrapper.state('open')).toEqual(true);
    const closeButton = wrapper.find('[id="closeDrawerButton"]')
                               .find(IconButton);
    closeButton.simulate('click');
    expect(wrapper.state('open')).toEqual(false);
  });
});

