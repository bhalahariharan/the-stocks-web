import { Route, Switch } from 'react-router-dom';

import AuthWall from './components/AuthWall';

function Routes() {
  return (
    <Switch>
      <Route exact path="/authwall">
        <AuthWall />
      </Route>
      <Route exact path="/">
        <p>Home</p>
      </Route>
      <Route path="*">
        <p>404 | Page not found</p>
      </Route>
    </Switch>
  );
}

export default Routes;
