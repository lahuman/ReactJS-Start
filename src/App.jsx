import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import { NAME } from './constants';
import style from  './style.css';

import Home from './components/Home';
import Scrum from './components/Scrum';
import NoMatch from './components/NoMatch';


// <div style={{color: 'blue'}} className='Hello'>{NAME}</div>
const Name = () => <div style={{color: 'blue'}} className={style.Hello}>{NAME}!!</div>;;
export default (props) => {
  return (
    // <div><Home /></div>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/scrum" component={Scrum} />
          <Route exact path="/name" component={Name} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
};