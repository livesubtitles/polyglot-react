import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/App/App';
import { HashRouter, Route, Switch } from "react-router-dom";
import 'src/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/link=:link&lang=:lang" render={props => <App link={props.match.params.link} lang={props.match.params.lang}/>}/>
      <Route path="/lang=:lang&link=:link" render={props => <App link={props.match.params.link} lang={props.match.params.lang}/>}/>
      <Route path="/link=:link" render={props => <App link={props.match.params.link}/>}/>
      <Route render={props => <App/>}/>
    </Switch>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
