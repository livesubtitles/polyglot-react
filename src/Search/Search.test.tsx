import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as TestRenderer from 'react-test-renderer';
import { Search } from 'src/Search/Search';
import { UrlInputView } from "src/UrlInputView/UrlInputView";
import { LanguageAutocomplete } from "src/LanguageAutocomplete/LanguageAutocomplete";
import IconButton from '@material-ui/core/IconButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Search onSearch={(s, l) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("calls search when input is valid", (done) => {
  const mockfn = jest.fn();
  const instance = TestRenderer.create(
                      <Search onSearch={mockfn}/>
                   ).root;

  const urlview = instance.findByType(UrlInputView);
  urlview.props.onChange({ target: { value: "www.youtube.com"}})

  const langAutocomplete = instance.findByType(LanguageAutocomplete);
  langAutocomplete.props.onChangeValue("Spanish");
  langAutocomplete.props.onSuggestionSelected(null, { suggestion: { label: "Spanish", value: "es-ES" }});

  const searchButton = instance.findByType(IconButton);
  searchButton.props.onClick()
  expect(mockfn.mock.calls.length).toEqual(1);
  done();
});
