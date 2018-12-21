import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestRenderer from 'react-test-renderer';
import { LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';
import InputLabel from "@material-ui/core/InputLabel";
import * as Autosuggest from "react-autosuggest";

function getLanguageAutocomplete(isErrorSuggestion: boolean) {
  return TestRenderer.create(<LanguageAutocomplete
    onSuggestionSelected={mockOnSuggestionSelected}
    onChangeValue={mockOnChangeValue}
    isErrorSuggestion={isErrorSuggestion}
  />).root;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LanguageAutocomplete
    onSuggestionSelected={(v) => {}}
    onChangeValue={(v) => {}}
    isErrorSuggestion={false}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let mockOnSuggestionSelected;
let mockOnChangeValue;

beforeEach(() => {
  mockOnSuggestionSelected = jest.fn();
  mockOnChangeValue = jest.fn();
}

it("calls onChangeValue when there is a change in the input", (done) => {
  const instance = getLanguageAutocomplete(false);
  const input = instance.find(el => el.type === "input");
  const testValue = "SomeValue";
  input.props.onChange({ target: { value: testValue } });
  expect(mockOnChangeValue.mock.calls.length).toEqual(1);
  expect(mockOnChangeValue.mock.calls[0]).toEqual([testValue]);
  done();
});

it("shows invalid message if it is an error suggestion", (done) => {
  const instance = getLanguageAutocomplete(true);
  const input = instance.findByType(InputLabel);
  expect(input.props.children).toEqual("Invalid language");
  done();
});

it("calls onSuggestionSelected when a suggestion is selected", (done) => {
  const instance = getLanguageAutocomplete(false);
  const autosuggest = instance.findByType(Autosuggest);
  const suggestion = { label: "English", value: "en-US"};
  autosuggest.props.onSuggestionSelected(null, { suggestion: suggestion });
  expect(mockOnSuggestionSelected.mock.calls.length).toEqual(1);
  expect(mockOnSuggestionSelected.mock.calls[0]).toEqual([null, { suggestion: suggestion }])
  done();
});
