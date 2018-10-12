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

import { SelectionControl, SelectionControlGroup } from '..'

const stories = {
  usage: {
    subtitle: 'Selection Controls',
    chapters: [
      {
        sections: [
          {
            title: 'Basic Selection Controls',
            sectionFn: () => {
              return (
                <div>
                  <SelectionControl
                    id='check-fusion'
                    name='simple-checkboxes[]'
                    label='Mr. Fusion'
                    type='checkbox'
                    value='mrfusion'
                    defaultChecked
                  />
                  <SelectionControl
                    id='check-lightning'
                    name='simple-checkboxes[]'
                    type='checkbox'
                    label='Lightning Bolt'
                    value='lightning'
                  />
                  <SelectionControl
                    id='check-train'
                    name='simple-checkboxes[]'
                    label='Steam Train'
                    type='checkbox'
                    value='train'
                    disabled
                  />
                  <SelectionControl
                    id='date'
                    type='switch'
                    label='Set the date'
                    name='date'
                    defaultChecked
                  />
                  <SelectionControl
                    id='enable'
                    type='switch'
                    label='Provide on 1.21 jigawatts'
                    name='enable'
                    disabled
                  />
                </div>
              )
            }
          },
          {
            title: 'Radios',
            sectionFn: () => {
              return (
                <SelectionControlGroup
                  id='selection-group'
                  name='radio-years'
                  type='radio'
                  label='The best time'
                  defaultValue='1955'
                  controls={[
                    {
                      label: '1955',
                      value: '1955'
                    },
                    {
                      label: '1985',
                      value: '1985'
                    },
                    {
                      label: '2015',
                      value: '2015'
                    }
                  ]}
                />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Selection Controls', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
