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

import { Slider } from '..'

const stories = {
  usage: {
    subtitle: 'Sliders',
    chapters: [
      {
        sections: [
          {
            title: 'Sliders',
            sectionFn: () => {
              return (
                <div>
                  <Slider id='continuous-plain-slider' />
                  <Slider
                    id='continuous-default-value-slider'
                    label='Default value slider'
                    defaultValue={20}
                  />
                  <Slider
                    id='continuous-discrete-value-slider'
                    label='Discrete value slider'
                    discrete
                  />
                  <Slider
                    id='continuous-disabled-slider'
                    label='Disabled slider'
                    disabled
                  />
                  <Slider
                    id='continuous-disabled-default-value-slider'
                    label='Disabled slider'
                    disabled
                    defaultValue={50}
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

storiesOf('Sliders', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
