/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import Icon from '..'

describe('Icon Component', () => {
  it('should render', () => {
    const wrapper = shallow(<Icon name='add' aria-label='add' />)
    expect(wrapper).toMatchSnapshot()
  })
})
