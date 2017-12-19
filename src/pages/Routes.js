import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Home from './Home';
import Error404 from './Error404'

const Pages = () => {
  return (
    <main role='application'>
      <Switch>
        <Route
          path='/'
          exact
          component={Home}
        />

        {/* Error 404 */}
        <Route component={Error404} />
      </Switch>
    </main>
  );
}

export default Pages;