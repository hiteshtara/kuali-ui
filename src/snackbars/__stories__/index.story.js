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

import SnackExamples from './snackbar-examples'
import Snackbar from '..'

const stories = {
  usage: {
    subtitle: 'Snackbars',
    chapters: [
      {
        sections: [
          {
            title: 'Snackbars ',
            sectionFn: () => {
              return (
                <div>
                  <Snackbar
                    id='example-snackbar'
                    toasts={[{ text: 'Yummmm, toast', action: 'Eat it' }]}
                    autohide={false}
                    onDismiss={() => {}}
                  />
                </div>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Snackbars', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
  .add('Examples', () => {
    return <SnackExamples />
  })
