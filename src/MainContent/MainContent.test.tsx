import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainContent } from 'src/MainContent/MainContent';
import * as enzyme from 'enzyme';
// @ts-ignore
import { SocketIO, Server } from 'mock-socket';
import { PolyglotErrorType } from "src/utils/interfaces";
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

  const FAKE_URL = 'https://localhost:12345/';
  let mockServer;

  beforeEach(() => {
    mockServer = new Server(FAKE_URL);
  });

  afterEach(() => {
    mockServer.stop();
  });

  it("Connects and calls a function on connection", done => {
    const mockfn = jest.fn();

    mockServer.on('connection', socket => {
      // @ts-ignore
      socket.on("connect", mockfn);
    });

    const wrapper = enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={SocketIO(FAKE_URL)} />).get(0));
    setTimeout(() => {
      expect(wrapper.state("error")).toBeNull();
      const s = wrapper.state("socket") as any;
      expect(s.url).toBe(FAKE_URL);
      expect(mockfn).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, 500);
  });

  function checkPolyglotError(errorEvent: string, typeError: PolyglotErrorType, done) {
    mockServer.on("connection", socket => {
      // @ts-ignore
      socket.emit(errorEvent, {});
    });

    const wrapper = enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={SocketIO(FAKE_URL)} />).get(0));
    setTimeout(() => {
      expect(wrapper.state("error")).toBe(typeError);
      mockServer.stop(done);
    }, 500);
  }

  it("Receives streamlink error - PolyglotErrorType.StreamlinkUnavailable", done => {
    checkPolyglotError("streamlink-error", PolyglotErrorType.StreamlinkUnavailable, done);
  });

  it("Receives connection error - PolyglotErrorType.SocketConnection" done => {
    checkPolyglotError("connect_error", PolyglotErrorType.SocketConnection, done);
  });

});
