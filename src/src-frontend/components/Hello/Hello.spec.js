import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import Hello from './Hello'

describe('<Hello />', () => {
  it('Hello has message', () => {
    const wrapper = mount(<Hello message="hello world"/>);
    expect(wrapper.props().message).to.equal("hello world")
  });
})
