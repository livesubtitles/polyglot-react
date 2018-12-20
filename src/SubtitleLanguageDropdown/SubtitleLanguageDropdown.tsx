import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { LanguageSuggestion } from "src/utils/interfaces";

export interface SubtitleLanguageDropdownProps extends WithStyles<typeof styles> {
  onSubtitleLanguageSelection(lang: string): void;
}

interface SubtitleLanguageDropdownState {
    subtitleLang: string;
}

const DEFAULT_LANGUAGE = "en-US";

const styles = theme => createStyles({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

export class SubtitleLanguageDropdownComponent extends React.Component<SubtitleLanguageDropdownProps, SubtitleLanguageDropdownState> {

   private static languages: LanguageSuggestion[] = [
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

    constructor(props) {
        super(props);
        this.state = {
            subtitleLang: DEFAULT_LANGUAGE
        };

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange = event => {
      const lang = event.target.value;
      this.setState({ subtitleLang: lang });
      this.props.onSubtitleLanguageSelection(lang.split("-")[0]);
    }

    private generateSubtitleLanguageOptions() {
      const items = [];
      let count = 0;
      for (const q of SubtitleLanguageDropdownComponent.languages) {
        items.push(<MenuItem key={count} value={q.value}>{q.label}</MenuItem>);
        count += 1;
      }
      return items;
    }

    render() {

        const { classes } = this.props;
        return (
          <React.Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="subtitle-dropdown-id">Subtitle Lang.</InputLabel>
            <Select
              value={this.state.subtitleLang}
              onChange={this.handleChange}
              inputProps={{
                name: 'subtitle-dropdown',
                id: 'subtitle-dropdown-id',
              }}
            >
              {...this.generateSubtitleLanguageOptions()}

            </Select>
      </FormControl>
      </React.Fragment>
        );
    }
}

export const SubtitleLanguageDropdown = withStyles(styles)(SubtitleLanguageDropdownComponent);
