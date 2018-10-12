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

import Error from '..'

const customMessage = `Find the nearest developer and let them know.
  The app crashed and it's all their fault!`

const stories = {
  first: {
    subtitle: 'A Generic Error Component',
    chapters: [
      {
        sections: [
          {
            title: 'Default Configuration',
            sectionFn: () => {
              return <Error />
            }
          },
          {
            title: 'Custom Title and Message',
            sectionFn: () => {
              return (
                <Error
                  title="Holey Moley! That wasn't supposed to happen!"
                  message={customMessage}
                />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Error', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.first)
