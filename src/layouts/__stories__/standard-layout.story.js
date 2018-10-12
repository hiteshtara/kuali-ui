/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Lorem from 'react-lorem-component'

import { Header as AppHeader, RaisedButton, NavList, NavListItem } from '../..'

import { PaddedContent, Sidebar, StandardLayout, TitleBar } from '..'

const userMenuItems = [
  {
    primaryText: 'User Settings',
    onClick: action('menu item clicked')
  },
  {
    primaryText: 'Pellentesque habitant morbi',
    onClick: action('menu item clicked')
  },
  {
    primaryText: 'Sign Out',
    onClick: action('menu item clicked')
  }
]

const header = (
  <AppHeader
    menuItems={userMenuItems}
    module={{ name: 'App Name' }}
    onBrandSelected={action('brand selected')}
    user={{ name: 'User Name' }}
  />
)
const navList = (
  <NavList>
    <NavListItem iconName='create'>
      Pellentesque habitant morbi tristique senectus
    </NavListItem>
    <NavListItem iconName='description'>Menu Option</NavListItem>
    <NavListItem iconName='question_answer'>
      Nested Nav
      <NavList>
        <NavListItem active>Without Icon</NavListItem>
        <NavListItem iconName='description'>With Icon</NavListItem>
      </NavList>
    </NavListItem>
    <NavListItem iconName='settings'>Configuration</NavListItem>
  </NavList>
)

storiesOf('Layout: Standard', module)
  .add('default', () => {
    const sidebar = (
      <Sidebar>
        <PaddedContent>
          <RaisedButton block label='action' />
          <RaisedButton block label='second action' />
        </PaddedContent>
      </Sidebar>
    )

    const titleBar = <TitleBar>Page Title</TitleBar>

    return (
      <StandardLayout
        header={header}
        navList={navList}
        sidebar={sidebar}
        titleBar={titleBar}
      >
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </StandardLayout>
    )
  })
  .add('without navigation', () => {
    const titleBar = <TitleBar>Page Title</TitleBar>

    return (
      <StandardLayout header={header} titleBar={titleBar}>
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </StandardLayout>
    )
  })
  .add('without sidebar', () => {
    const titleBar = <TitleBar>Page Title</TitleBar>

    return (
      <StandardLayout header={header} navList={navList} titleBar={titleBar}>
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </StandardLayout>
    )
  })
  .add('with a back button', () => {
    const titleBar = (
      <TitleBar onBack={action('back button clicked')}>Page Title</TitleBar>
    )

    return (
      <StandardLayout header={header} navList={navList} titleBar={titleBar}>
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </StandardLayout>
    )
  })
