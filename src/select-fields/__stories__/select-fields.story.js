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
import states from '../../../.storybook/data/states'
import loremIpsum from 'lorem-ipsum'

import SelectField from '..'

const stories = {
  usage: {
    chapters: [
      {
        title: '<SelectField /> Component',
        info: 'Basic Usage',
        sections: [
          {
            title: 'Normal SelectField',
            sectionFn: () => (
              <SelectField
                id='states'
                placeholder='Select a State'
                menuItems={states}
                itemLabel='name'
                itemValue='abbreviation'
                className='md-cell'
                helpText='Helpful Text'
              />
            )
          },
          {
            title: 'Short SelectField with Long Options',
            sectionFn: () => (
              <SelectField
                id='states'
                style={{ width: 200 }}
                placeholder='Select a long option'
                menuItems={[
                  loremIpsum({ count: 10, units: 'words' }),
                  loremIpsum({ count: 10, units: 'words' }),
                  loremIpsum({ count: 10, units: 'words' }),
                  loremIpsum({ count: 10, units: 'words' })
                ]}
                className='md-cell'
                helpText='Helpful Text'
              />
            )
          }
        ]
      },
      {
        title: 'Positioning',
        info: 'Where to Display Options Menu',
        sections: [
          {
            title: 'Top Left (default)',
            sectionFn: () => (
              <SelectField
                id='states'
                placeholder='Select a State'
                menuItems={states}
                itemLabel='name'
                itemValue='abbreviation'
                className='md-cell'
                helpText='Helpful Text'
                position={SelectField.Positions.TOP_LEFT}
              />
            )
          },
          {
            title: 'Bottom Left',
            sectionFn: () => (
              <SelectField
                id='states'
                placeholder='Select a State'
                menuItems={states}
                itemLabel='name'
                itemValue='abbreviation'
                className='md-cell'
                helpText='Helpful Text'
                position={SelectField.Positions.BOTTOM_LEFT}
              />
            )
          }
        ]
      }
    ]
  }
}

storiesOf('Select Field', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
