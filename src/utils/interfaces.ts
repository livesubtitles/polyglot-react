
export interface InitialStreamPostArguments {
  url: string;
  lang: string;
}

export interface ProcessResponse {
  subtitle: string;
  lang: string;
  error?: PolyglotErrorType;
}

export interface LanguageSuggestion {
  label: string;
  value: string;
}

export type Quality = string;

export enum PolyglotErrorType {
  StreamlinkUnavailable         = "StreamlinkUnavailable",
  UninitialisedStreamer         = "UninitialisedStreamer",
  SocketConnection              = "SocketConnection",
  MaxTimeExceededLoginRequired  = "MaxTimeExceededLoginRequired"
}

export interface URLParams {
  link?: string;
  lang?: string;
}
