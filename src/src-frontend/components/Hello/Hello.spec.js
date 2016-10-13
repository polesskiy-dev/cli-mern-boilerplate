import React from 'react'
import {describe, it} from 'mocha'
import {shallow} from 'enzyme'
import chai from 'chai'
import Hello from './Hello'

describe('<Hello />', () => {
  it('Hello has message', () => {
    const wrapper = shallow(<Hello message="hello world"/>);
    chai.expect(wrapper.props.message.to.be.equal("hello world"))
  });
})
