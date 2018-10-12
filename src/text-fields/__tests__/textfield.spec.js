/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { mount } from 'enzyme'

import Icon from '../../icons'
import TextField from '..'

describe('TextField Component', () => {
  it('should render default', () => {
    const wrapper = mount(<TextField />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with info icon', () => {
    const wrapper = mount(<TextField leftIcon={<Icon name='info' />} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with report_problem icon', () => {
    const wrapper = mount(<TextField leftIcon={<Icon name='info' />} error />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with leftIconStateful = true without error', () => {
    const wrapper = mount(<TextField leftIconStateful={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with leftIconStateful = true with error', () => {
    const wrapper = mount(<TextField leftIconStateful={false} error />)
    expect(wrapper).toMatchSnapshot()
  })
})
