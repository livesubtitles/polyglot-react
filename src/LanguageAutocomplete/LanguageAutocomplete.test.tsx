import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestRenderer from 'react-test-renderer';
import { renderSuggestion, LanguageAutocomplete } from 'src/LanguageAutocomplete/LanguageAutocomplete';
import InputLabel from "@material-ui/core/InputLabel";
import * as Autosuggest from "react-autosuggest";
import * as enzyme from "enzyme";
import MenuItem from '@material-ui/core/MenuItem';

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

describe("Prop testing", () => {

  let mockOnSuggestionSelected;
  let mockOnChangeValue;

  function getLanguageAutocomplete(isErrorSuggestion: boolean) {
    return TestRenderer.create(<LanguageAutocomplete
      onSuggestionSelected={mockOnSuggestionSelected}
      onChangeValue={mockOnChangeValue}
      isErrorSuggestion={isErrorSuggestion}
    />).root;
  }

  beforeEach(() => {
    mockOnSuggestionSelected = jest.fn();
    mockOnChangeValue = jest.fn();
  });

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
});
