import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainContent } from 'src/MainContent/MainContent';
import * as enzyme from 'enzyme';
import * as SocketMock from 'socket.io-mock';
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

  it("Connects and calls a function on connection", done => {
    const fakeURL = 'https://localhost:12345/';
    const mockServer = new Server(fakeURL);
    const mockfn = jest.fn();

    mockServer.on('connection', socket => {
      // @ts-ignore
      socket.on("connect", mockfn);
    });

    const wrapper = enzyme.mount(enzyme.shallow(<MainContent link="www.youtube.com" socket={SocketIO(fakeURL)} />).get(0));
    setTimeout(() => {
      expect(wrapper.state().error).toBeNull();
      expect(wrapper.state().socket.url).toBe(fakeURL);
      expect(mockfn).toHaveBeenCalledTimes(1);
      mockServer.stop(done);
    }, 1000);

  });

});
