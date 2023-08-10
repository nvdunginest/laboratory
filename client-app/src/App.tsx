import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import Search from './pages/Search';
import Success from './pages/Success';


export default function App(): JSX.Element {

  return (
    <Layout >
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/success/:id/:email/:phone" component={Success} />
        </Switch>
      </>
    </Layout >
  );
}
