import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { Home } from '..';
import { Header } from '../../components';
import Footer from '../../components/molekuls/Footer';
import CreateTour from '../CreateTour';
import DetailTour from '../DetailTour';
import UpdateTour from '../UpdateTour';
import './mainApp.scss';

const MainApp = () => {
  return (
    <div className='main-app-wrapper'>
      <Header />
      <main id='mainContent' className='content-wrapper'>
        <Router>
          <Switch>
            <Route path="/create-tour">
              <CreateTour />
            </Route>
            <Route path="/update-tour/:id?">
              <UpdateTour />
            </Route>
            <Route path="/detail-tour/:id">
              <DetailTour />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </main>
      <Footer />
    </div>
  )
}

export default MainApp;
