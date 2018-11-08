import * as React from 'react';
import { createMediaSource } from "src/Video/videoUtils.js";
export interface VideoProps {
    vid: string;
}

interface VideoState {
    k: number;
    video: string;
    mediaSource: any;
}

export class Video extends React.Component<VideoProps, VideoState> {
    // private static link = "http://techslides.com/demos/sample-videos/small.mp4";

    private static sourceBuffer;

    constructor(props: VideoProps) {
        super(props);
        this.state = {
            k: 1,
            video: this.props.vid,
            mediaSource: createMediaSource()
        };
    }

    private heyo(): void {
      let urlStream = "https://polyglot-livesubtitles.herokuapp.com/stream";
      const pageUrl = "https://www.youtube.com/watch?v=mV8jp1N2fSw";
      let request: any = { url: pageUrl, lang: "es-ES" };

      // TODO: use fetchJSON from src/utils/web.ts
      fetch(urlStream, {method: 'post',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          body: request})
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log(response);
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
            response.json().then(function(data) {
              console.log(data.subtitle);
              console.log(data.lang);
              let resp = new Uint8Array(JSON.parse(data.video)["py/seq"]);

              Video.sourceBuffer.appendBuffer(resp);
              console.log(resp);
              // console.log(data.video.py/seq);
            });
          },
        );
        alert("hello");
    }
    public componentDidMount() {
      this.heyo();
      // const videoSourceBuffer = ;
      let self = this;
      this.state.mediaSource.addEventListener('sourceopen', function(e) {
        // TODO: put sourceBuffer as part of the state. If we create more than
        // one Video component at the same time, we still want to have a different sourceBufer
        Video.sourceBuffer = self.state.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001e"');
      }, false);
    }

    render() {
        return (
            <div>
            <video src={window.URL.createObjectURL(this.state.mediaSource)} controls />
            <p>{this.state.video}</p>
            </div>
        );
    }

}
