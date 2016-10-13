import React, {Component} from 'react'
import Hello from './Hello/Hello'

/**
 * Root component
 */
class App extends Component {
  render() {
    return (
      <section className="container">
        {this.props.children}
        <Hello message="Hello world!"/>
      </section>
    )
  }
}

export default App;
