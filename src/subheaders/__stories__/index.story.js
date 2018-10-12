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

import { Subheader } from '..'
import { List, ListItem } from '../../lists'
import { Divider } from '../../dividers'
import { Avatar } from '../../avatars'

const stories = {
  usage: {
    subtitle: 'Subheaders',
    chapters: [
      {
        sections: [
          {
            title: 'Subheaders ',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <List className='md-cell md-paper md-paper--1'>
                    <Subheader primary primaryText='Primary Styled' />
                    <ListItem primaryText='First' />
                    <ListItem primaryText='Second' />
                    <ListItem primaryText='Third' />
                  </List>
                  <List className='md-cell md-paper md-paper--1'>
                    <Subheader primaryText='Inset' inset />
                    <Divider inset />
                    <ListItem
                      primaryText='First'
                      leftAvatar={<Avatar role='presentation'>A</Avatar>}
                    />
                    <ListItem
                      primaryText='Second'
                      leftAvatar={<Avatar role='presentation'>B</Avatar>}
                    />
                    <ListItem
                      primaryText='Third'
                      leftAvatar={<Avatar role='presentation'>C</Avatar>}
                    />
                  </List>
                </div>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Subheaders', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
