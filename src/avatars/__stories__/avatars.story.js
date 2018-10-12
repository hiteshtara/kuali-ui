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

import Avatar from '..'
import Icon from '../../icons/index'

const stories = {
  usage: {
    chapters: [
      {
        title: '<Avatar /> Component',
        sections: [
          {
            title: 'Basic with letter',
            sectionFn: () => {
              return <Avatar>Q</Avatar>
            }
          },
          {
            title: 'Random color',
            sectionFn: () => {
              return <Avatar random>Q</Avatar>
            }
          },
          {
            title: 'Icon & set color',
            sectionFn: () => {
              return (
                <Avatar icon={<Icon name='star_border' />} suffix='yellow' />
              )
            }
          },
          {
            title: 'Random image',
            sectionFn: () => {
              return (
                <Avatar
                  src='https://picsum.photos/200/?random'
                  role='presentation'
                />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Avatars', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
