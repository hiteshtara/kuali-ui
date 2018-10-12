/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import { ListItem } from '../../lists'
import Icon from '../../icons'

import { MenuButton } from '..'

const noop = () => {}

describe('MenuButton Component', () => {
  it('should render', () => {
    const icon = <Icon name='settings' />

    const wrapper = shallow(
      <MenuButton
        id='button-menu'
        label='Toggle Open a Menu'
        raised
        buttonChildren={icon}
        variant='torch'
      >
        <ListItem onClick={noop} primaryText='Item One' />
        <ListItem onClick={noop} primaryText='Item Two' />
        <ListItem onClick={noop} primaryText='Item Three' />
        <ListItem onClick={noop} primaryText='Item Four' />
      </MenuButton>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
