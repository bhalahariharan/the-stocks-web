import { Route, Switch } from 'react-router-dom';

function Routes() {
  return (
    <Switch>
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
