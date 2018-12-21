import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestRenderer from 'react-test-renderer';
import { LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';
import InputLabel from "@material-ui/core/InputLabel";

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

it("calls onChangeValue when there is a change in the input", (done) => {
  const mockOnSuggestionSelected = jest.fn();
  const mockOnChangeValue = jest.fn();
  const instance = TestRenderer.create(
                      <LanguageAutocomplete
                        onSuggestionSelected={mockOnSuggestionSelected}
                        onChangeValue={mockOnChangeValue}
                        isErrorSuggestion={false}
                      />
                   ).root;
  const input = instance.find(el => el.type === "input");
  const testValue = "SomeValue";
  input.props.onChange({ target: { value: testValue } });
  expect(mockOnChangeValue.mock.calls.length).toEqual(1);
  expect(mockOnChangeValue.mock.calls[0]).toEqual([testValue]);
  done();
});

it("shows invalid message if it is an error suggestion", (done) => {
  const mockOnSuggestionSelected = jest.fn();
  const mockOnChangeValue = jest.fn();
  const instance = TestRenderer.create(
                      <LanguageAutocomplete
                        onSuggestionSelected={mockOnSuggestionSelected}
                        onChangeValue={mockOnChangeValue}
                        isErrorSuggestion={true}
                      />
                   ).root;

  const input = instance.findByType(InputLabel);
  expect(input.props.children).toEqual("Invalid language");
  done();
});
