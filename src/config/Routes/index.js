import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Login, MainApp, Signup } from '../../pages';

const Routes = () => {
  const user = localStorage.getItem('token');
  return (
    <Router>
        <Switch>
          {user && <Route path='/'><MainApp /></Route>}
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/">
              <Redirect to='/login'></Redirect>
            </Route>
        </Switch>
    </Router>
  )
}

export default Routes;
