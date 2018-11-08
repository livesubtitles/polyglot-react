
export interface InitialStreamPostArguments {
  url: string;
  lang: string;
}

export type StreamSubtitlePostArguments = InitialStreamPostArguments;

export interface ProcessResponse {
  subtitle: string;
  lang: string;
  error?: PolyglotErrorType;
}

export interface LanguageSuggestion {
  label: string;
  value: string;
}

export enum PolyglotErrorType {
  StreamlinkUnavailable = "StreamlinkUnavailable",
  UninitialisedStreamer = "UninitialisedStreamer"
}
