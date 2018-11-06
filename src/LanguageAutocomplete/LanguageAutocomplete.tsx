import * as React from "react";
import { deburr } from "lodash";
import * as Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import "src/commonCSS.css";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { LanguageSuggestion } from "src/utils/interfaces";

const suggestions: LanguageSuggestion[] = [
  { label: "Afrikaans", value: "af-ZA" },
  { label: "Amharic", value: "am-ET" },
  { label: "Armenian", value: "hy-AM" },
  { label: "Azerbaijani", value: "az-AZ" },
  { label: "Indonesian", value: "id-ID" },
  { label: "Malay", value: "ms-MY" },
  { label: "Bengali", value: "bn-BD" },
  { label: "Catalan", value: "ca-ES" },
  { label: "Czech", value: "cs-CZ" },
  { label: "Danish", value: "da-DK" },
  { label: "German", value: "de-DE" },
  { label: "English", value: "en-US" },
  { label: "Spanish", value: "es-ES" },
  { label: "French", value: "fr-FR" },
  { label: "Filipino", value: "it-IT" },
  { label: "Italian", value: "it-IT" },
  { label: "Portuguese", value: "pt-PT" },
  { label: "Romanian", value: "ro-RO" },
  { label: "Greek", value: "el-GR" },
  { label: "Turkish", value: "tr-TR" },
  { label: "Russian", value: "ru-RU" },
  { label: "Japanese", value: "ja-JP" },
  { label: "Korean", value: "ko-KR" }
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion: LanguageSuggestion) {
  return suggestion.label;
}

const styles = theme => createStyles({
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
});

interface LanguageAutocompleteProps extends WithStyles<typeof styles> {
  onSuggestionSelected(value): void;
  onChangeValue(value: string): void;
  isErrorSuggestion: boolean;
}

interface LanguageAutocompleteState {
  single: string;
  suggestions: LanguageSuggestion[];
}

class LanguageAutocompleteComponent extends React.Component<LanguageAutocompleteProps, LanguageAutocompleteState> {
  constructor(props) {
    super(props);
    this.state = {
      single: "",
      suggestions: []
    };
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  private handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  private handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  private handleChange = (event, { newValue }) => {
    this.setState({
      single: newValue
    });
    this.props.onChangeValue(newValue);
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: "Language of video",
            value: this.state.single,
            onChange: this.handleChange
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
          onSuggestionSelected={this.props.onSuggestionSelected}
        />
    );
  }
}
const LanguageAutocomplete = withStyles(styles)(LanguageAutocompleteComponent);
export { LanguageAutocomplete };
