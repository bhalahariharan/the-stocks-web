import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import AuthWall from './components/AuthWall';

function Routes() {
  return (
    <Switch>
      <Route exact path="/authwall">
        <AuthWall />
      </Route>
      <PrivateRoutes />
      <Route path="*">
        <p>404 | Page not found</p>
      </Route>
    </Switch>
  );
}

export default Routes;
