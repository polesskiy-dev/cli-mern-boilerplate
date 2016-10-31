import React from 'react'

import 'reset.less'
import Hello from './Hello/Hello'

/**
 * Root component
 */
const App = props =>
  <section className="container">
    {props.children}
    <Hello message="Hello world!"/>
  </section>

export default App;
