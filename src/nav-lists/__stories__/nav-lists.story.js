/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import Center from '../../../.storybook/components/center'
import Link from '../../../.storybook/components/link'

import { NavList, NavListItem } from '..'

storiesOf('Nav List', module)
  .addDecorator(story => (
    <Center style={{ backgroundColor: 'gray' }}>{story()}</Center>
  ))
  .add('default', () => {
    return (
      <NavList>
        <NavListItem iconName='create'>
          Pellentesque habitant morbi tristique
        </NavListItem>
        <NavListItem iconName='description'>Menu Option</NavListItem>
        <NavListItem>Menu Option No Icon</NavListItem>
        <NavListItem active iconName='question_answer'>
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
  })
  .add('with a Link component wrapper', () => {
    return (
      <NavList>
        <NavListItem container={Link} iconName='create' to='/asdf'>
          Pellentesque habitant morbi tristique senectus
        </NavListItem>
      </NavList>
    )
  })
  .add('nested navs can default to being collapsed', () => {
    return (
      <NavList>
        <NavListItem iconName='create'>
          Pellentesque habitant morbi tristique
        </NavListItem>
        <NavListItem iconName='description'>Menu Option</NavListItem>
        <NavListItem>Menu Option No Icon</NavListItem>
        <NavListItem active defaultNestedCollapsed iconName='question_answer'>
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
  })
