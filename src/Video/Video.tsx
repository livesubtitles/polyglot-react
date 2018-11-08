import * as React from 'react';
export interface VideoProps {
    vid: string;
}

interface VideoState {
    k: number;
    video: string;
}

export class Video extends React.Component<VideoProps, VideoState> {
    // private static link = "http://techslides.com/demos/sample-videos/small.mp4";
    constructor(props: VideoProps) {
        super(props);
        this.state = {
            k: 1,
            video: this.props.vid,
        };
    }
    private static sourceBuffer;
    readonly ms = new MediaSource();

    private heyo(): void {
      let urlStream = "http://127.0.0.1:8000/stream";
      const pageUrl = "https://www.youtube.com/watch?v=mV8jp1N2fSw";
      let request = JSON.stringify(JSON.parse("{\"url\":\"" + pageUrl + "\", \"lang\":\"" + "es-ES" + "\"}"));

      fetch(urlStream, {method: 'post',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          body: request})
      .then(
        function(response) {
          if (response.status !== 200) {
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
      this.ms.addEventListener('sourceopen', function(e) {
        Video.sourceBuffer = this.ms.addSourceBuffer('video/mp4; codecs="avc1.64001e"');
      }, false);
    }

    render() {
        return (
            <div>
            <video src={window.URL.createObjectURL(this.ms)} controls />
            <p>{this.state.video}</p>
            </div>
        );
    }

}
