/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import { NavList, NavListItem } from '..'

describe('NavList Component', () => {
  it('should render a nav list', () => {
    const wrapper = shallow(
      <NavList>
        <NavListItem iconName='create'>
          Pellentesque habitant morbi tristique senectus
        </NavListItem>
        <NavListItem iconName='description'>Menu Option</NavListItem>
        <NavListItem active iconName='question_answer'>
          Active Menu Option
        </NavListItem>
        <NavListItem iconName='settings'>Configuration</NavListItem>
      </NavList>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with a nested menu', () => {
    const wrapper = shallow(
      <NavList>
        <NavListItem iconName='create'>
          Pellentesque habitant morbi tristique
        </NavListItem>
        <NavListItem active iconName='description'>
          Menu Option
        </NavListItem>
        <NavListItem>Menu Option No Icon</NavListItem>
        <NavListItem iconName='question_answer'>
          Item with Nested Nav
          <NavList>
            <NavListItem>Without Icon</NavListItem>
            <NavListItem iconName='description'>With Icon</NavListItem>
          </NavList>
        </NavListItem>
        <NavListItem iconName='settings'>
          Pellentesque habitant morbi tristique
        </NavListItem>
      </NavList>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
