/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import Error from '..'

describe('Error Component', () => {
  it('should render an Error component with defaults', () => {
    const wrapper = shallow(<Error />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an Error component with custom props', () => {
    const wrapper = shallow(<Error title='Test title' message='Test message' />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an Error component with custom icon', () => {
    const wrapper = shallow(<Error customIconClass='fa fa-warning' />)
    expect(wrapper).toMatchSnapshot()
  })
})
