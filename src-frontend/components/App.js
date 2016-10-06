import React, {Component} from 'react'

/**
 * Root component
 */
class App extends Component {
  render() {
    return (
      <section className="container">
        {this.props.children}
      </section>
    );
  }
}

export default App;
