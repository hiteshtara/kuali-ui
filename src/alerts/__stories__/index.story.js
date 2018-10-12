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
import Alert from '..'

const stories = {
  info: {
    subtitle: '',
    chapters: [
      {
        sections: [
          {
            title: '',
            sectionFn: () => {
              return (
                <Alert title='Header Here' message='Message goes here :)' />
              )
            }
          }
        ]
      }
    ]
  },
  success: {
    subtitle: '',
    chapters: [
      {
        sections: [
          {
            title: '',
            sectionFn: () => {
              return <Alert type='success' message='Message goes here :)' />
            }
          }
        ]
      }
    ]
  },
  warning: {
    subtitle: '',
    chapters: [
      {
        sections: [
          {
            title: '',
            sectionFn: () => {
              return (
                <Alert
                  type={Alert.TYPES.WARNING}
                  title='Header Here'
                  message='Message goes here :)'
                />
              )
            }
          }
        ]
      }
    ]
  },
  error: {
    subtitle: '',
    chapters: [
      {
        sections: [
          {
            title: '',
            sectionFn: () => {
              return (
                <Alert
                  type='error'
                  title='Header Here'
                  message='Message goes here :)'
                />
              )
            }
          }
        ]
      }
    ]
  },
  autoHide: {
    subtitle: '',
    chapters: [
      {
        sections: [
          {
            title: '',
            sectionFn: () => {
              return (
                <Alert
                  type='success'
                  useHeaderLabel={false}
                  title='Saved!'
                  message='Your document has been saved.'
                  autoHide
                  visibleFor={1500}
                />
              )
            }
          }
        ]
      }
    ]
  },
  noHeader: {
    subtitle: '',
    chapters: [
      {
        sections: [
          {
            title: '',
            sectionFn: () => {
              return (
                <Alert useHeaderLabel={false} message='Message goes here :)' />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Alerts', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Info', stories.info)
  .addWithChapters('Success', stories.success)
  .addWithChapters('Warning', stories.warning)
  .addWithChapters('Error', stories.error)
  .addWithChapters('Auto Hide', stories.autoHide)
  .addWithChapters('No Header', stories.noHeader)
