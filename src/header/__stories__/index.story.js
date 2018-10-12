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
import WithChapters from '../../../.storybook/components/with-chapters'

import Header from '..'

const stories = {
  first: {
    subtitle: 'The Branded Application Header',
    chapters: [
      {
        sections: [
          {
            title: 'Default Configuration',
            sectionFn: () => {
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              const menuItems = [
                {
                  primaryText: 'User Settings',
                  onClick: action('menu item clicked')
                }
              ]
              const module = {
                name: 'Conflict of Interest'
              }
              const user = { name: 'Slartibartfast' }

              return (
                <Header
                  menuItems={menuItems}
                  module={module}
                  onBrandSelected={action('brand selected')}
                  user={user}
                />
              )
            }
          },
          {
            title: 'Without User',
            sectionFn: () => {
              return (
                <Header
                  module={{ name: '' }}
                  onBrandSelected={action('brand selected')}
                />
              )
            }
          },
          {
            title: 'Custom Logo',
            sectionFn: () => {
              const Logo = (
                <img
                  style={{ maxHeight: '100%' }}
                  src='https://rsweb.research.colostate.edu/images/CSU-Official-wrdmrk-357.png'
                />
              )
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              const menuItems = [
                {
                  primaryText: 'User Settings',
                  onClick: action('menu item clicked')
                }
              ]
              const module = {
                name: 'Conflict of Interest'
              }
              const user = { name: 'Slartibartfast' }

              return (
                <Header
                  Logo={Logo}
                  menuItems={menuItems}
                  module={module}
                  onBrandSelected={action('brand selected')}
                  user={user}
                />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Header', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.first)
