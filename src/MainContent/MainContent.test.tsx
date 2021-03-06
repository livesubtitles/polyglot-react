import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainContent, SERVER_URL } from 'src/MainContent/MainContent';
import * as enzyme from 'enzyme';
// @ts-ignore
import { SocketIO, Server } from 'mock-socket';
import { PolyglotErrorType, Quality } from "src/utils/interfaces";
import { PolyglotError } from "src/PolyglotError/PolyglotError";
import * as io from 'socket.io-client';
import { HlsService } from "src/MainContent/HlsService";
import { VideoOptions } from "src/VideoOptions/VideoOptions";
import { SubtitleOptions } from "src/SubtitleOptions/SubtitleOptions";
import { Search } from "src/Search/Search";
import { PolyglotLinearProgress } from "src/PolyglotLinearProgress/PolyglotLinearProgress";
import * as fetchMock from "fetch-mock";
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

const TIMEOUT  = 200;
const FAKE_URL = 'https://localhost:12345/';
fetchMock.get(`${SERVER_URL}/`, { hasBeenCalled: true });

function getMainContentWithSocket(socket) {
  return enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={socket} />).get(0));
}

function getBasicMainContent() {
  return getMainContentWithSocket(SocketIO(FAKE_URL));
}

// Because whoever wrote the library had no idea of typescript
function socketON(socket, event: string, func) {
  // @ts-ignore
  socket.on(event, func);
}

function socketEMIT(socket, event: string, func) {
  // @ts-ignore
  socket.emit(event, func);
}

describe("Socket tests", () => {

  const MockHlsService = createMockHlsService();
  let mockServer;

  beforeEach(() => {
    mockServer = new Server(FAKE_URL);
    // mocks the wake up call to the server
    setUpDefaultMockDocument();
  });

  afterEach(() => {
    fetchMock.resetHistory();
    mockServer.stop();
  });

  it("Connects and calls a function on connection", done => {
    const mockfn = jest.fn();

    mockServer.on('connection', socket => {
      socketON(socket, "connect", mockfn);
    });

    const wrapper = getBasicMainContent();
    setTimeout(() => {
      expect(wrapper.state("error")).toBeNull();
      const s = wrapper.state("socket") as any;
      expect(s.url).toBe(FAKE_URL);
      expect(mockfn).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, TIMEOUT);
  });

  it("Mounting the component makes a wake up call", () => {
    expect(fetchMock.called(`${SERVER_URL}/`)).toBe(false);
    const wrapper = getBasicMainContent();
    expect(fetchMock.called(`${SERVER_URL}/`)).toBe(true);
  });

  function checkPolyglotError(errorEvent: string, typeError: PolyglotErrorType, wrapperCreator, finalExpects, done) {
    mockServer.on("connection", socket => {
      socketEMIT(socket, errorEvent, {});
    });

    const wrapper = wrapperCreator();
    setTimeout(() => {
      expect(wrapper.find(PolyglotError).exists()).toBe(false);
      wrapper.update();
      expect(wrapper.find(PolyglotError).exists()).toBe(true);
      expect(wrapper.find(PolyglotError).props().error).toBe(typeError);
      finalExpects(wrapper);
      mockServer.stop(done);
    }, 250);
  }

  it("Receives streamlink error - PolyglotErrorType.StreamlinkUnavailable", done => {
    checkPolyglotError(
      "streamlink-error",
      PolyglotErrorType.StreamlinkUnavailable,
      () => getBasicMainContent(),
      wrapper => {},
      done
    );
  });

  it("Receives connection error - PolyglotErrorType.SocketConnection", done => {
    checkPolyglotError(
      "connect_error",
      PolyglotErrorType.SocketConnection,
      () => getBasicMainContent(),
      wrapper => {},
      done
    );
  });

  it("Receiving login-required from server shows MaxTimeExceededLoginRequired error and destroys hls player", done => {
    const m = new MockHlsService();
    checkPolyglotError(
      "login-required",
      PolyglotErrorType.MaxTimeExceededLoginRequired,
      () => createMainContentWithMockHls(m),
      wrapper => {
        expect(m.destroy).toHaveBeenCalledTimes(1);
      },
      done
    );
  });

  it("Restoring error gets you back to home page", done => {
    mockServer.on("connection", socket => {
      socketEMIT(socket, "connect_error", {});
    });
    const mockfn = jest.fn();
    window.location.reload = mockfn;
    const wrapper = getBasicMainContent();
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(PolyglotError).exists()).toBe(true);
      wrapper.find(PolyglotError).props().restoredError();
      // reload location, so go back to home page
      expect(mockfn).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, TIMEOUT);
  });

  it("search sets up socket listener properly", done => {
    const URL  = "A random url";
    const LANG = { label: "Spanish", value: "es-ES" };
    mockServer.on("connection", socket => {
      socketEMIT(socket, "server-ready", {});
      socketON(socket, "stream", payload => {
        expect(payload.url).toEqual(URL);
        expect(payload.lang).toEqual(LANG);
      })
    });

    const wrapper = enzyme.mount(enzyme.shallow(<MainContent socket={SocketIO(FAKE_URL)} />).get(0));
    wrapper.find(Search).props().onSearch(URL, LANG);
    setTimeout(() => {
      mockServer.stop(done);
    }, TIMEOUT);
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
      wrapper = getBasicMainContent();
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
    const wrapper = getBasicMainContent();
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
      loadSource: jest.fn(() => setUpVideoModeDocument()),
      attachMedia: jest.fn(),
      onManifestParsed: jest.fn(),
      onBufferAppended: jest.fn(),
      onBufferAppendError: jest.fn(),
      destroy: jest.fn(),
      onPlay: jest.fn()
    }));
  }

  // loading div always has to be there

  function setUpDefaultMockDocument() {
    document.body.innerHTML =
    '<div>' +
    '  <div id="loadingdiv" style="display: none;"></div>' +
    '  <div id="searchdiv" ></div>' +
    '</div>';
  }

  function setUpVideoModeDocument() {
    document.body.innerHTML =
    '<div>' +
    '  <div id="loadingdiv" style="display: none;"></div>' +
    '  <div id="videodiv" ><video id="video" /></div>' +
    '</div>';
  }

  function createMainContentWithMockHls(m) {
    return enzyme.mount(enzyme.shallow(
                      <MainContent
                        hls={m}
                        link="www.youtube.com"
                        socket={SocketIO(FAKE_URL)} />)
                      .get(0));
  }

  function checkRightHlsServiceMethodsAreCalled(mediaURL: string, done, qualities?: Quality[]) {
    const m: HlsService = new MockHlsService();
    const wrapper = createMainContentWithMockHls(m);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.state("mediaURL")).toBe(mediaURL);
      if (qualities) {
        expect(wrapper.state("qualities")).toEqual(qualities);
      }
      expect(m.isSupported).toHaveBeenCalledTimes(1);
      expect(m.loadSource).toHaveBeenCalledTimes(1);
      // @ts-ignore
      expect(m.loadSource.mock.calls[0]).toEqual([ mediaURL ]);
      expect(m.attachMedia).toHaveBeenCalledTimes(1);
      expect(m.onManifestParsed).toHaveBeenCalledTimes(1);
      expect(m.onBufferAppended).toHaveBeenCalledTimes(1);
      expect(m.onBufferAppendError).toHaveBeenCalledTimes(1);
      expect(m.destroy).toHaveBeenCalledTimes(0);
      // check that the onPlay function has been called to show the subtitles onplay
      expect(m.onPlay).toHaveBeenCalledTimes(0);
      const video = document.getElementById("video") as HTMLVideoElement;
      // @ts-ignore
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
    const m = new MockHlsService();
    setUpDefaultMockDocument();
    const MEDIA_URL = "This is a media url, I swear";
    const FAKE_QUALITY = "Top-notch quality";
    // to have the VideoOptions component we need a mediaURL
    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: MEDIA_URL }));
      socketON(socket, "quality", payload => {
        expect(payload.quality).toEqual(FAKE_QUALITY);
      });
    });
    const wrapper = createMainContentWithMockHls(m);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(VideoOptions).exists()).toBe(true);
      wrapper.find(VideoOptions).props().onQualitySelection(FAKE_QUALITY);
      expect(m.destroy).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, TIMEOUT);

  });

  it("Calling handleSubtitleLanguageChange emits new language", done => {
    const m = new MockHlsService();
    const MEDIA_URL = "This is a media url, I swear";
    const FAKE_LANGUAGE = "Some random language from somewhere";
    // to have the VideoOptions component we need a mediaURL
    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: MEDIA_URL }));
      socketON(socket, "language", payload => {
        expect(payload.sub_lang).toEqual(FAKE_LANGUAGE);
      });
    });
    const wrapper = createMainContentWithMockHls(m);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(SubtitleOptions).exists()).toBe(true);
      wrapper.find(SubtitleOptions).props().onSubtitleLanguageChange(FAKE_LANGUAGE);
      mockServer.stop(done);
    }, TIMEOUT);
  });

  function checkDivHasStyle(div, style) {
    const divRef = document.getElementById(div)
    expect(divRef.style.display).toEqual(style);
  }

  it("Divs are shown properly - when all are available", done => {
    const m = new MockHlsService();
    const wrapper = createMainContentWithMockHls(m);
    // before we showLoading, videodiv has not been set yet, loadingdiv is
    // none because we stopped it
    m.loadSource = u => {
      // At this point we know mediaUrl has been set, so video mode document
      // is the document mock required
      setUpVideoModeDocument();
      checkDivHasStyle("loadingdiv", "none");
      checkDivHasStyle("videodiv", "");
      expect(document.getElementById("searchdiv")).toBeNull();
    };
    m.attachMedia = v => {
      checkDivHasStyle("loadingdiv", "flex");
      checkDivHasStyle("videodiv", "none");
      expect(document.getElementById("searchdiv")).toBeNull();
    }
    const MEDIA_URL = "This is a media url, I swear";
    setUpDefaultMockDocument();

    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: MEDIA_URL }));

    });
    // at the start, search should not have a style
    checkDivHasStyle("searchdiv", "");
    checkDivHasStyle("loadingdiv", "none");
    expect(document.getElementById("videodiv")).toBeNull();
    setTimeout(() => {
      mockServer.stop(done);
    }, TIMEOUT);
  });

  it("Receiving progress from server updates progress of PolyglotLinearProgress", done => {
    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: "Some media url" }));
      socketEMIT(socket, "progress", JSON.stringify({ progress: 5 }));
      socketEMIT(socket, "progress", JSON.stringify({ progress: 10}));
    });

    const wrapper = getBasicMainContent();
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(PolyglotLinearProgress).props().value).toBe(15);
      mockServer.stop(done);
    }, TIMEOUT);
  });

});

describe("CSS addRule tests", () => {

  let mockServer;
  let mst;

  beforeEach(() => {
    mockServer = new Server(FAKE_URL);
    mst = setUpMockStylesheet();
  });

  afterEach(() => {
    mockServer.stop();
  });

  function createMockStylesheet() {
    return jest.fn(() => ({
      addRule: jest.fn()
    }));
  }

  function setUpMockStylesheet() {
    const MockStylesheet = createMockStylesheet();
    const mStylesheet = new MockStylesheet();
    // we dont need anything else for the mock, so dont bother
    // @ts-ignore
    document.styleSheets[0] = mStylesheet;
    return mStylesheet;
  }

  function checkPropWithChangeCueCSS(func, arglist, done) {
    mockServer.on("connection", socket => {
      socketEMIT(socket, "stream-response", JSON.stringify({ media: "Some media url" }));
    });
    const wrapper = getBasicMainContent();
    setTimeout(() => {
      wrapper.update();
      func(wrapper);
      expect(mst.addRule).toHaveBeenCalledTimes(1);
      expect(mst.addRule.mock.calls[0]).toEqual(arglist);
      mockServer.stop(done);
    }, TIMEOUT);
  }

  it("handleFontSizeChange calls changeCueCSS correctly", done => {
    const FONT_SIZE = 3;
    checkPropWithChangeCueCSS(wrapper => {
      wrapper.find(SubtitleOptions).props().onFontSizeChange(FONT_SIZE);
    }, ["::cue", `font-size: ${FONT_SIZE}px`], done);
  });

  it("handleFontSelection calls changeCueCSS correctly", done => {
    const FONT_FAMILY = "Comic Sans";
    checkPropWithChangeCueCSS(wrapper => {
      wrapper.find(SubtitleOptions).props().onFontSelection(FONT_FAMILY);
    }, ["::cue", `font-family: ${FONT_FAMILY}`], done);
  });

  it("handleBackgroundColorChange calls changeCueCSS correctly", done => {
    const COLOR = "yellow";
    checkPropWithChangeCueCSS(wrapper => {
      wrapper.find(SubtitleOptions).props().onBackgroundColorChange(COLOR);
    }, ["::cue", `background-color: ${COLOR}`], done);
  });

  it("handleSubtitleColorChange calls changeCueCSS correctly", done => {
    const COLOR = "blue";
    checkPropWithChangeCueCSS(wrapper => {
      wrapper.find(SubtitleOptions).props().onSubtitleColorChange(COLOR);
    }, ["::cue", `color: ${COLOR}`], done);
  });

});
