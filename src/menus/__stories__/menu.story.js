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

import { ListItem } from '../../lists'
import Icon from '../../icons'

import { MenuButton } from '..'

const handleOpen = action('menu open')

const stories = {
  usage: {
    chapters: [
      {
        title: '<MenuButton /> Component',
        info: 'Basic Usage',
        sections: [
          {
            sectionFn: () => {
              const icon = <Icon name='settings' />
              const itemProps = { role: 'menuitem' }

              return (
                <MenuButton
                  id='button-menu'
                  label='Toggle Open a Menu'
                  raised
                  buttonChildren={icon}
                  variant='torch'
                >
                  <ListItem
                    onClick={handleOpen}
                    primaryText='Item One'
                    itemProps={itemProps}
                  />
                  <ListItem
                    onClick={handleOpen}
                    primaryText='Item Two'
                    itemProps={itemProps}
                  />
                  <ListItem
                    onClick={handleOpen}
                    primaryText='Item Three'
                    itemProps={itemProps}
                  />
                  <ListItem
                    onClick={handleOpen}
                    primaryText='Item Four'
                    itemProps={itemProps}
                  />
                </MenuButton>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Menu Button', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
