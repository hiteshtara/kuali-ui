/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import WithChapters from '../../../.storybook/components/with-chapters'

import Drawer from '..'
import { RaisedButton } from '../../buttons'
import { Toolbar } from '../../toolbars'
import { ListItem } from '../../lists'
import Icon from '../../icons'
import ExampleWrapper from './components/example-wrapper'

const items = [
  <ListItem key='1' leftIcon={<Icon name='chat' />} primaryText='Chat' />,
  <ListItem key='2' leftIcon={<Icon name='forum' />} primaryText='Forums' />,
  <ListItem key='3' leftIcon={<Icon name='email' />} primaryText='Email' />
]

const stories = {
  usage: {
    chapters: [
      {
        title: '<Drawer /> Component',
        sections: [
          {
            title: 'Right Drawer',
            sectionFn: () => {
              return (
                <Drawer
                  id='simple-drawer-example'
                  type={Drawer.DrawerTypes.TEMPORARY}
                  visible
                  position='right'
                  navItems={items}
                  onVisibilityChange={() => {}}
                  header={
                    <Toolbar
                      nav={<RaisedButton icon>{'close'}</RaisedButton>}
                      className='md-divider-border md-divider-border--bottom'
                    />
                  }
                />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Drawers', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
  .add('Example', () => {
    return <ExampleWrapper />
  })
