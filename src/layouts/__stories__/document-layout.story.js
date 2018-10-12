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

import { Header as AppHeader, Icon, RaisedButton } from '../..'
import {
  DocumentLayout,
  JumpToMenu,
  JumpToMenuItem,
  PaddedContent,
  Sidebar,
  TitleBar
} from '..'

storiesOf('Layout: Document', module)
  .add('default', () => {
    const header = (
      <AppHeader
        menuItems={[
          {
            primaryText: 'User Settings',
            onClick: action('menu item clicked')
          }
        ]}
        module={{ name: 'App Name' }}
        user={{ name: 'User Name' }}
      />
    )

    const titleBar = <TitleBar>Page Title</TitleBar>

    return (
      <DocumentLayout header={header} titleBar={titleBar}>
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </DocumentLayout>
    )
  })
  .add('with sidebar', () => {
    const header = (
      <AppHeader
        menuItems={[
          {
            primaryText: 'User Settings',
            onClick: action('menu item clicked')
          }
        ]}
        module={{ name: 'App Name' }}
        user={{ name: 'User Name' }}
      />
    )

    const sidebar = (
      <Sidebar>
        <RaisedButton block label='action' />
        <RaisedButton block label='second action' />
      </Sidebar>
    )

    const titleBar = <TitleBar>Page Title</TitleBar>

    return (
      <DocumentLayout header={header} sidebar={sidebar} titleBar={titleBar}>
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </DocumentLayout>
    )
  })
  .add('with a menu', () => {
    const header = (
      <AppHeader
        menuItems={[
          {
            primaryText: 'User Settings',
            onClick: action('menu item clicked')
          }
        ]}
        module={{ name: 'App Name' }}
        user={{ name: 'User Name' }}
      />
    )

    const menu = (
      <JumpToMenu>
        <JumpToMenuItem checked onClick={action('menu item clicked')}>
          Est velit labore esse esse cupidatat.
        </JumpToMenuItem>
        <JumpToMenuItem onClick={action('menu item clicked')}>
          This is a menu
        </JumpToMenuItem>
        <JumpToMenuItem badgeCount={2} onClick={action('menu item clicked')}>
          It allows the user
        </JumpToMenuItem>
        <JumpToMenuItem badgeCount={42} onClick={action('menu item clicked')}>
          To jump to different
        </JumpToMenuItem>
        <JumpToMenuItem
          icon={<Icon name='remove_red_eye' variant='info' />}
          onClick={action('menu item clicked')}
        >
          Sections
        </JumpToMenuItem>
      </JumpToMenu>
    )

    const sidebar = (
      <Sidebar>
        <RaisedButton block label='action' />
        <RaisedButton block label='second action' />
      </Sidebar>
    )

    const titleBar = <TitleBar>Page Title</TitleBar>

    return (
      <DocumentLayout
        header={header}
        menu={menu}
        sidebar={sidebar}
        titleBar={titleBar}
      >
        <PaddedContent>
          <Lorem />
        </PaddedContent>
      </DocumentLayout>
    )
  })
