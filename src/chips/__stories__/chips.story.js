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

import Chip from '..'
import Avatar from '../../avatars'

const stories = {
  usage: {
    chapters: [
      {
        title: '<Chip /> Component',
        sections: [
          {
            title: 'Basic',
            sectionFn: () => {
              return <Chip label='I am a chip' />
            }
          },
          {
            title: 'Removable',
            sectionFn: () => {
              return <Chip removable label='With delete icon' />
            }
          },
          {
            title: 'With Avatar',
            sectionFn: () => {
              return (
                <Chip avatar={<Avatar random>B</Avatar>} label='Bob Ross' />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Chips', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
