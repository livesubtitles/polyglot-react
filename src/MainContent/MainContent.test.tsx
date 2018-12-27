import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainContent } from 'src/MainContent/MainContent';
import * as enzyme from 'enzyme';
// @ts-ignore
import { SocketIO, Server } from 'mock-socket';
import { PolyglotErrorType, Quality } from "src/utils/interfaces";
import { PolyglotError } from "src/PolyglotError/PolyglotError";
import * as io from 'socket.io-client';
import { HlsService } from "src/MainContent/HlsService";
import { VideoOptions } from "src/VideoOptions/VideoOptions";
/*
  @ts-ignore has been added throughout this file, because the creator of the dependency
  we use to mock the socket-io socket is a bit useless and was not able to provide a consistent typings file.
  Unfortunately, there are no other mocking implementations that work decently.
*/

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainContent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Socket tests", () => {
  const TIMEOUT  = 200;
  const FAKE_URL = 'https://localhost:12345/';
  const MockHlsService = createMockHlsService();
  let mockServer;

  beforeEach(() => {
    mockServer = new Server(FAKE_URL);
  });

  afterEach(() => {
    mockServer.stop();
  });

  // Because whoever wrote the library had no idea of typescript
  function socketON(socket, event: string, func) {
    // @ts-ignore
    socket.on(event, func);
  }

  function socketEMIT(socket, event: string, func) {
    // @ts-ignore
    socket.emit(event, func);
  }

  it("Connects and calls a function on connection", done => {
    const mockfn = jest.fn();

    mockServer.on('connection', socket => {
      socketON(socket, "connect", mockfn);
    });

    const wrapper = enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={SocketIO(FAKE_URL)} />).get(0));
    setTimeout(() => {
      expect(wrapper.state("error")).toBeNull();
      const s = wrapper.state("socket") as any;
      expect(s.url).toBe(FAKE_URL);
      expect(mockfn).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, TIMEOUT);
  });

  function checkPolyglotError(errorEvent: string, typeError: PolyglotErrorType, done) {
    mockServer.on("connection", socket => {
      socketEMIT(socket, errorEvent, {});
    });

    const wrapper = enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={SocketIO(FAKE_URL)} />).get(0));
    setTimeout(() => {
      expect(wrapper.find(PolyglotError).exists()).toBe(false);
      wrapper.update();
      expect(wrapper.find(PolyglotError).exists()).toBe(true);
      expect(wrapper.find(PolyglotError).props().error).toBe(typeError);
      mockServer.stop(done);
    }, 250);
  }

  it("Receives streamlink error - PolyglotErrorType.StreamlinkUnavailable", done => {
    checkPolyglotError("streamlink-error", PolyglotErrorType.StreamlinkUnavailable, done);
  });

  it("Receives connection error - PolyglotErrorType.SocketConnection" done => {
    checkPolyglotError("connect_error", PolyglotErrorType.SocketConnection, done);
  });

  function checkStreamEventSent(url, lang, done) {
    mockServer.on("connection", socket => {
      socketON(socket, "stream", payload => {
        expect(payload.url).toBe(url);
        expect(payload.lang).toBe(lang);
      });
      socketEMIT(socket, "server-ready", {});
    });
    let wrapper;
    if (lang !== "") {
      wrapper = enzyme.mount(enzyme.shallow(<MainContent link={url} lang={lang} socket={SocketIO(FAKE_URL)} />).get(0));
    } else {
      wrapper = enzyme.mount(enzyme.shallow(<MainContent link={url} socket={SocketIO(FAKE_URL)} />).get(0));
    }
    setTimeout(() => {
      mockServer.stop(done);
    }, TIMEOUT);
  }

  it("Emits stream event with url and lang on receipt of server ready", done => {
    checkStreamEventSent("www.youtube.com", "Spanish", done);
  });

  it("Emits stream event with empty language if not given to MainContent", done => {
    checkStreamEventSent("www.youtube.com", "", done);
  });

  it("Emits stream response with empty media url and triggers StreamlinkUnavailable error", done => {
    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: "" }));
    });
    const wrapper = enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={SocketIO(FAKE_URL)} />).get(0));
    setTimeout(() => {
      expect(wrapper.find(PolyglotError).exists()).toBe(false);
      wrapper.update();
      expect(wrapper.find(PolyglotError).exists()).toBe(true);
      expect(wrapper.find(PolyglotError).props().error).toBe(PolyglotErrorType.StreamlinkUnavailable);
      mockServer.stop(done);
    }, TIMEOUT);
  });

  function createMockHlsService() {
    return jest.fn<HlsService>(() => ({
      isSupported: jest.fn(() => true),
      loadSource: jest.fn(),
      attachMedia: jest.fn(),
      onManifestParsed: jest.fn(),
      onBufferAppended: jest.fn(),
      destroy: jest.fn(),
      onPlay: jest.fn()
    }));
  }

  function setUpMockDocument() {
    document.body.innerHTML =
    '<div>' +
    '  <video id="video" />' +
    '</div>';
  }

  function checkRightHlsServiceMethodsAreCalled(mediaURL: string, done, qualities?: Quality[]) {
    setUpMockDocument();
    const m = new MockHlsService();
    const wrapper = enzyme.mount(enzyme.shallow(
                      <MainContent
                        hls={m}
                        link="www.youtube.com"
                        socket={SocketIO(FAKE_URL)} />)
                      .get(0));

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.state("mediaURL")).toBe(mediaURL);
      if (qualities) {
        expect(wrapper.state("qualities")).toEqual(qualities);
      }
      expect(m.isSupported).toHaveBeenCalledTimes(1);
      expect(m.loadSource).toHaveBeenCalledTimes(1);
      expect(m.loadSource.mock.calls[0]).toEqual([ mediaURL ]);
      expect(m.attachMedia).toHaveBeenCalledTimes(1);
      expect(m.onManifestParsed).toHaveBeenCalledTimes(1);
      expect(m.onBufferAppended).toHaveBeenCalledTimes(1);
      expect(m.destroy).toHaveBeenCalledTimes(0);
      // check that the onPlay function has been called to show the subtitles onplay
      expect(m.onPlay).toHaveBeenCalledTimes(0);
      const video = document.getElementById("video") as HTMLVideoElement;
      video.dispatchEvent(new window.Event("play"));
      expect(m.onPlay).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, TIMEOUT);
  }

  it("Calls the right HlsJS methods when media is non empty with no qualities", done => {

    const MEDIA_URL = "someMediaURL";

    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: MEDIA_URL }));
    });

    checkRightHlsServiceMethodsAreCalled(MEDIA_URL, done);
  });

  it("Calls the right HlsJS methods when media is non empty with qualities", done => {
    const MEDIA_URL = "someMediaURL";
    const QUALITIES = ["onequality", "anotherquality", "morequalities"];

    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: MEDIA_URL, qualities: QUALITIES }));
    });

    checkRightHlsServiceMethodsAreCalled(MEDIA_URL, done, QUALITIES);
  });

  it("Calling handleQualitySelection emits quality and destroys the player", done => {
    setUpMockDocument();
    const m = new MockHlsService();
    const MEDIA_URL = "This is a media url, I swear";
    const FAKE_QUALITY = "Top-notch quality";
    // to have the VideoOptions component we need a mediaURL
    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: MEDIA_URL }));
      socketON(socket, "quality", payload => {
        expect(payload.quality).toEqual(FAKE_QUALITY);
      });
    });
    const wrapper = enzyme.mount(enzyme.shallow(
                      <MainContent
                        hls={m}
                        link="www.youtube.com"
                        socket={SocketIO(FAKE_URL)} />)
                      .get(0));
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(VideoOptions).exists()).toBe(true);
      wrapper.find(VideoOptions).props().onQualitySelection(FAKE_QUALITY);
      expect(m.destroy).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, TIMEOUT);

  });

});
