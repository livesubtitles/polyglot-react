import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/App/App';
import { MainContent } from "src/MainContent/MainContent";
import * as enzyme from 'enzyme';
import ButtonBase from "@material-ui/core/ButtonBase";
import { Information } from "src/Information/Information";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("passes link and language correctly to MainContent", () => {
  const LINK = "www.youtube.com";
  const LANG = "Spanish";
  const wrapper = enzyme.mount(<App link={LINK} lang={LANG} />);
  const mainContent = wrapper.find(MainContent);
  expect(mainContent.props().link).toEqual(LINK);
  expect(mainContent.props().lang).toEqual(LANG);
});

it("passes link only to MainContent", () => {
  const LINK = "www.youtube.com";
  const wrapper = enzyme.mount(<App link={LINK} />);
  const mainContent = wrapper.find(MainContent);
  expect(mainContent.props().link).toEqual(LINK);
  expect(mainContent.props().lang).toBeUndefined();
});

it("passes nothing to MainContent", () => {
  const wrapper = enzyme.mount(<App />);
  const mainContent = wrapper.find(MainContent);
  expect(mainContent.props().link).toBeUndefined();
  expect(mainContent.props().lang).toBeUndefined();
});

it("default mode and changing mode", () => {
  const wrapper = enzyme.mount(<App />);
  // default is MainContent
  expect(wrapper.find(MainContent).exists()).toBe(true);
  const infoButton = wrapper.find("#infoButtonApp");
  infoButton.find(ButtonBase).simulate("click");
  expect(wrapper.find(MainContent).exists()).toBe(false);
  expect(wrapper.find(Information).exists()).toBe(true);
  const homeButton = wrapper.find("#homeButtonApp");
  homeButton.find(ButtonBase).simulate("click");
  expect(wrapper.find(MainContent).exists()).toBe(true);
  expect(wrapper.find(Information).exists()).toBe(false);
});
