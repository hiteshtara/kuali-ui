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

import { LinearProgress, CircularProgress } from '..'

const stories = {
  usage: {
    subtitle: 'Progress',
    chapters: [
      {
        sections: [
          {
            title: 'Circular Progress',
            sectionFn: () => {
              return (
                <div>
                  <CircularProgress id='circular' />
                </div>
              )
            }
          },
          {
            title: 'Linear Progress',
            sectionFn: () => {
              return (
                <div>
                  <LinearProgress id='linear' value={65} />
                </div>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Progress', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
