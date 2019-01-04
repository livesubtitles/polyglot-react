import * as Hls from "hls.js";

export interface HlsService {
  isSupported(): boolean;
  loadSource(manifest_url: string): void;
  attachMedia(v: HTMLVideoElement): void;
  onManifestParsed(func: (event, data) => void): void;
  onBufferAppendError(handleError: () => void): void;
  onBufferAppended(func: () => void): void;
  destroy(): void;
  onPlay(): void;
}

export class HlsJS implements HlsService {

  private hls;

  constructor() {
    this.hls = new Hls();
  }

  public isSupported(): boolean {
    return Hls.isSupported();
  }

  public loadSource(manifest_url: string): void {
    this.hls.loadSource(manifest_url);
  }

  public attachMedia(v: HTMLVideoElement): void {
    this.hls.attachMedia(v);
  }

  public onManifestParsed(func: (event, data) => void): void {
    this.hls.on(Hls.Events.MANIFEST_PARSED, func);
  }

  public onBufferAppendError(handleError: () => void): void {
    this.hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.type == Hls.ErrorTypes.MEDIA_ERROR) {
        switch (data.details) {
          case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
          case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
              // handle error
              handleError();
              break;
          default:
            console.log("Unknown HLS error");
          }
      }
    });
  }

  public onBufferAppended(func: () => void): void {
    this.hls.on(Hls.Events.BUFFER_APPENDED, func);
  }

  public destroy(): void {
    // destroy and restore immediately
    this.hls.destroy();
    this.hls = new Hls();
  }

  public onPlay(): void {
      const vid = document.getElementById("video") as HTMLVideoElement;
      const textTrack = vid.textTracks[0];
      textTrack.mode = "showing";
  }
}
