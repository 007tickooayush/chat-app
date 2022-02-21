import React from 'react';
import { Switch,Route } from 'react-router-dom';
import SignIn from './pages/SignIn';

import './styles/main.scss';


function App() {
  return (
    <Switch>
      <Route >
        <SignIn/>
      </Route>


    </Switch>
  );
}

export default App;
