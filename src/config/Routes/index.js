import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Login, MainApp, Signup } from '../../pages';
import './routes.scss';

const Routes = () => {
  const user = localStorage.getItem('token');
  return (
    <>
      <a tabIndex='0' href='#mainContent' className='skip-link'>Go to Content</a>
      <Router>
          <Switch>
            {user && <Route path='/'><MainApp /></Route>}
            <main id='mainContent'>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/">
                <Redirect to='/login'></Redirect>
              </Route>
            </main>
          </Switch>
      </Router>
    </>
  )
}

export default Routes;
