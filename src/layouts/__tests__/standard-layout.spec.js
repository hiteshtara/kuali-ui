/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import { Header, NavList, NavListItem } from '../../'
import { Sidebar, StandardLayout, TitleBar } from '..'

const noop = () => {}

describe('StandardLayout Component', () => {
  const header = (
    <Header
      menuItems={[]}
      module={{ name: 'App Name' }}
      onBrandSelected={noop}
      user={{ name: 'User Name' }}
    />
  )

  const navList = (
    <NavList>
      <NavListItem iconName='create'>
        Pellentesque habitant morbi tristique senectus
      </NavListItem>
    </NavList>
  )

  const sidebar = (
    <Sidebar>
      <p>sidebar component</p>
    </Sidebar>
  )

  const titleBar = <TitleBar>Page Title</TitleBar>

  it('should render', () => {
    const wrapper = shallow(
      <StandardLayout
        header={header}
        navList={navList}
        sidebar={sidebar}
        titleBar={titleBar}
      >
        <p>body content</p>
      </StandardLayout>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without a nav list', () => {
    const wrapper = shallow(
      <StandardLayout header={header} sidebar={sidebar} titleBar={titleBar}>
        <p>body content</p>
      </StandardLayout>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
