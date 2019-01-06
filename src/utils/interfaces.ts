
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


export interface AuthReply {
  email: string;
}

export type Quality = string;

export enum PolyglotErrorType {
  StreamlinkUnavailable         = "StreamlinkUnavailable",
  UninitialisedStreamer         = "UninitialisedStreamer",
  SocketConnection              = "SocketConnection",
  MaxTimeExceededLoginRequired  = "MaxTimeExceededLoginRequired",
  BufferAppendError             = "BufferAppendError"
}

export interface URLParams {
  link?: string;
  lang?: string;
}
