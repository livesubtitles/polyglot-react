import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestRenderer from 'react-test-renderer';
import {
  renderSuggestion,
  renderInputComponent,
  getSuggestionValue,
  getSuggestions,
  LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';
import InputLabel from "@material-ui/core/InputLabel";
import * as Autosuggest from "react-autosuggest";
import * as enzyme from "enzyme";
import MenuItem from '@material-ui/core/MenuItem';
import Language from "@material-ui/icons/Language";
import TextField from "@material-ui/core/TextField";

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

const C_SUGGESTIONS = [
  { label: "Catalan", value: "ca-ES" },
  { label: "Czech", value: "cs-CZ" }
];

describe("Prop testing", () => {

  let mockOnSuggestionSelected;
  let mockOnChangeValue;

  function getLanguageAutocompleteShallow(isErrorSuggestion: boolean) {
    return enzyme.shallow(<LanguageAutocomplete
      onSuggestionSelected={mockOnSuggestionSelected}
      onChangeValue={mockOnChangeValue}
      isErrorSuggestion={isErrorSuggestion}
    />).dive();
  }

  // only way to get the state without exporting the component without styles
  // it blows up types, but the alternative is to export the component without styles
  // but then typing of "classes" mess everything up, and aint got time for that
  function getLanguageAutocompleteWithState(isErrorSuggestion: boolean) {
    return enzyme.mount(enzyme.shallow(<LanguageAutocomplete
      onSuggestionSelected={mockOnSuggestionSelected}
      onChangeValue={mockOnChangeValue}
      isErrorSuggestion={isErrorSuggestion}/>).get(0));
  }

  beforeEach(() => {
    mockOnSuggestionSelected = jest.fn();
    mockOnChangeValue = jest.fn();
  });

  it("calls onChangeValue when there is a change in the input", () => {
    const instance = getLanguageAutocompleteWithState(false);
    const input = instance.find("input");
    const testValue = "SomeValue";
    // dont really get why this is not accepted, guess it's a problem with typings
    // currentTarget does not work
    // @ts-ignore
    input.props().onChange({ target: { value: testValue } });
    expect(mockOnChangeValue.mock.calls.length).toEqual(1);
    expect(mockOnChangeValue.mock.calls[0]).toEqual([testValue]);
  });

  it("shows invalid message if it is an error suggestion", () => {
    const instance = getLanguageAutocompleteWithState(true);
    const input = instance.find(InputLabel);
    expect(input.props().children).toEqual("Invalid language");
  });

  it("calls onSuggestionSelected when a suggestion is selected", () => {
    const instance = getLanguageAutocompleteShallow(false);
    const autosuggest = instance.find(Autosuggest);
    const suggestion = { label: "English", value: "en-US"};
    // onSuggestionSelected is not typed as prop for autosuggest? or at least
    // enzyme does not see it
    // @ts-ignore
    autosuggest.props().onSuggestionSelected(null, { suggestion: suggestion });
    expect(mockOnSuggestionSelected.mock.calls.length).toEqual(1);
    expect(mockOnSuggestionSelected.mock.calls[0]).toEqual([null, { suggestion: suggestion }]);
  });

  it("obtains and clear suggestions properly", () => {
    const instance = getLanguageAutocompleteWithState(false);
    const autosuggest: enzyme.ReactWrapper = instance.find(Autosuggest);
    expect(instance.state("suggestions")).toEqual([]);
    // @ts-ignore
    autosuggest.props().onSuggestionsFetchRequested({ value: "C" });
    expect(instance.state("suggestions")).toEqual(C_SUGGESTIONS);
    // @ts-ignore
    autosuggest.props().onSuggestionsClearRequested();
    expect(instance.state("suggestions")).toEqual([]);
  });
});

describe("Function testing", () => {

  it("renderSuggestion renders matching suggestions properly", () => {
    const SUGGESTION = { label: "Spanish", value: "es-ES" };
    const res = enzyme.mount(renderSuggestion(SUGGESTION, { query: "spa", isHighlighted: true }));
    const menuItem = res.find(MenuItem);
    expect(menuItem).toHaveLength(1);
    const span = res.find(MenuItem).find(".renderSuggestionSpan");
    expect(span).toHaveLength(1);
    expect(span.props().children).toEqual("Spa");
    const strong = res.find(MenuItem).find(".renderSuggestionStrong");
    expect(strong).toHaveLength(1);
    expect(strong.props().children).toEqual("nish");
  });

  it("renderInputComponent renders input component properly", () => {
    const k = { input: "inputClass" };
    const ref = () => {};
    const inputProps = { classes: k, ref: ref };
    const res = enzyme.mount(renderInputComponent(inputProps));
    expect(res.find("input").hasClass("inputClass")).toBe(true);
    // expect to have a language icon
    expect(res.find(Language)).toHaveLength(1);
    expect(res.find(TextField).exists()).toBe(true);
  });

  it("getSuggestionValue returns label of suggestion", () => {
    const res = getSuggestionValue({ label: "SomeRandomLabel", value: "Value!!!" });
    expect(res).toEqual("SomeRandomLabel");
  });

  it("getSuggestions works correctly", () => {
    const res = getSuggestions("Spanish");
    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({ label: "Spanish", value: "es-ES"});

    const resMultiple = getSuggestions("C");
    expect(resMultiple).toHaveLength(2);
    for (const i in resMultiple) {
      expect(resMultiple[i]).toEqual(C_SUGGESTIONS[i]);
    }

    const resNone = getSuggestions("Nothing");
    expect(resNone).toHaveLength(0);
  });

});
