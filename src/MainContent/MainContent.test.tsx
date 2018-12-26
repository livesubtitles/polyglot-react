import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainContent } from 'src/MainContent/MainContent';
import * as enzyme from 'enzyme';
// @ts-ignore
import { SocketIO, Server } from 'mock-socket';
import { PolyglotErrorType } from "src/utils/interfaces";
import { PolyglotError } from "src/PolyglotError/PolyglotError";
import * as io from 'socket.io-client';

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
  const TIMEOUT  = 250;
  const FAKE_URL = 'https://localhost:12345/';
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

  it("Emits stream response with empty Media url and triggers StreamlinkUnavailable error", done => {
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

});
