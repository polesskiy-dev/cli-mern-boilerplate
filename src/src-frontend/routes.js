import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'

const routes =
  <Route path='/' component={App}>
    <IndexRoute component={App}/>
  </Route>

export default routes
