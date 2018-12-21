import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as TestRenderer from 'react-test-renderer';
import { Search } from 'src/Search/Search';
import { UrlInputView } from "src/UrlInputView/UrlInputView";
import { LanguageAutocomplete } from "src/LanguageAutocomplete/LanguageAutocomplete";
import IconButton from '@material-ui/core/IconButton';
import { LanguageSuggestion } from "src/utils/interfaces";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Search onSearch={(s, l) => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


const URL = "www.youtube.com";
const LANG_SUGGESTION = { label: "Spanish", value: "es-ES" }

function simulateSearch(url: string, valueLabel: string, suggestion: LanguageSuggestion, numCalls: number, expectationFunc) {
  const mockfn = jest.fn();
  const instance = TestRenderer.create(
                      <Search onSearch={mockfn}/>
                   ).root;

  const urlview = instance.findByType(UrlInputView);
  urlview.props.onChange({ target: { value: url}})

  const langAutocomplete = instance.findByType(LanguageAutocomplete);
  langAutocomplete.props.onChangeValue(valueLabel);
  langAutocomplete.props.onSuggestionSelected(null, { suggestion: suggestion });
  const searchButton = instance.findByType(IconButton);
  searchButton.props.onClick();
  expect(mockfn.mock.calls.length).toEqual(numCalls);
  expectationFunc(mockfn);
}

it("calls search when input is valid", (done) => {

  simulateSearch(URL, LANG_SUGGESTION.label, LANG_SUGGESTION, 1, (mockfn) => {
    expect(mockfn.mock.calls[0]).toEqual([URL, LANG_SUGGESTION]);
  });
  done();
});


it("does not call search if url input is empty", (done) => {
  simulateSearch("", LANG_SUGGESTION.label, LANG_SUGGESTION, 0, (mockfn) => {});
  done();
});

it("does not call search if language typed is not in suggestions", (done) => {
  simulateSearch(URL, "SomeRandomLanguage", LANG_SUGGESTION, 0, (mockfn) => {});
  done();
});

it("does not call search if language typed is different from choice (so it has not been selected properly)", (done) => {
  simulateSearch(URL, "French", LANG_SUGGESTION, 0, (mockfn) => {});
  done();
});
