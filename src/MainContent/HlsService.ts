import * as Hls from "hls.js";

export interface HlsService {
  loadSource(manifest_url: string): void;
  attachMedia(v: HTMLVideoElement): void;
  onManifestParsed(func: (event, data) => void): void;
  onBufferAppended(func: () => void): void;
  destroy(): void;
}

export class HlsJS implements HlsService {

  private hls;

  constructor() {
    this.hls = new Hls();
  }

  public static isSupported(): boolean {
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

  public onBufferAppended(func: () => void): void {
    this.hls.on(Hls.Events.BUFFER_APPENDED, func);
  }

  public destroy(): void {
    this.hls.destroy();
  }
}
