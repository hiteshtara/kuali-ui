/* Copyright © 2018 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Lorem from 'react-lorem-component'
import { NavListItem } from '../../nav-lists'
import { GrayjoyLayout, PaddedContent } from '..'

storiesOf('Layout: Grayjoy', module).add('default', () => {
  const sidebarBodyLinks = [
    <NavListItem key='1' active iconName='perm_contact_calendar'>
      NavItem 1
    </NavListItem>,
    <NavListItem key='2' iconName='date_range'>
      NavItem 2
    </NavListItem>
  ]
  const sidebarFooterLinks = (
    <div>
      <NavListItem
        className='grayjoy-layout__sidebar-item'
        iconName='account_circle'
      >
        Display Name
      </NavListItem>
      <NavListItem
        className='grayjoy-layout__sidebar-item'
        iconName='notifications'
      >
        Notifications
      </NavListItem>
      <NavListItem className='grayjoy-layout__sidebar-item' iconName='message'>
        Help
      </NavListItem>
    </div>
  )

  return (
    <GrayjoyLayout
      userDisplayName='user name'
      appName='App Name'
      pageTitle='Page title'
      sidebarBodyLinks={sidebarBodyLinks}
      sidebarFooterLinks={sidebarFooterLinks}
    >
      <PaddedContent>
        <Lorem />
      </PaddedContent>
    </GrayjoyLayout>
  )
})
