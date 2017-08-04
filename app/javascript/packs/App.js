import React from 'react';
import { Route, Switch, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter, Link } from 'react-router-dom';
import HomeStats from './containers/HomeStats'
import PlayerStats from './containers/PlayerStats'
import PlayerProfile from './containers/PlayerProfile'
const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/' component={PlayerStats} />
          <Route path='/player_stats/:name' component={PlayerProfile} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
