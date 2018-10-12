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

import Divider from '..'

const stories = {
  usage: {
    chapters: [
      {
        title: '<Divider /> Component',
        sections: [
          {
            title: 'Horizontal',
            sectionFn: () => {
              return <Divider />
            }
          },
          {
            title: 'Vertical',
            sectionFn: () => {
              return (
                <div style={{ height: '100px' }}>
                  <Divider vertical />
                </div>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Dividers', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
