import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Home from './pages/Home';
import Error404 from './pages/Error404'
import LogInPage from './pages/Login/LoginPage';

const Pages = () => {
  return (
    <main role='application'>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path="/login" component={LogInPage} />
        <Route component={Error404} />
      </Switch>
    </main>
  );
}

export default Pages;
