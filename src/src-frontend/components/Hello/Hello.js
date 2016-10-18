import React, { Component } from 'react'
import * as styles from './Hello.less'

export default class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = { message: props.message }
  }

  render() {
    return (
      <div>
        <h1 className={styles['hello-message']}>{this.state.message}</h1>
      </div>
    )
  }
}
