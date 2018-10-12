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

import { RaisedButton } from '../../buttons'
import ToolTipIcon from './components/tooltip-icon'

const stories = {
  usage: {
    subtitle: 'Tooltips',
    chapters: [
      {
        sections: [
          {
            title: 'Tooltips',
            sectionFn: () => {
              return (
                <div>
                  <RaisedButton
                    tooltipLabel='I am a tooltip!'
                    tooltipPosition='top'
                    label='Add'
                  />
                </div>
              )
            }
          },
          {
            title: 'Custom Components with tooltips',
            sectionFn: () => {
              return (
                <div>
                  <ToolTipIcon
                    tooltipLabel='Are you sure?'
                    tooltipPosition='bottom'
                    name='delete'
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

storiesOf('Tooltips', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
