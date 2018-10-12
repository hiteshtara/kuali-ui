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

import langs from './data/langs'

import Autocomplete from '..'

const stories = {
  usage: {
    chapters: [
      {
        title: '<Autocomplete /> Component',
        sections: [
          {
            title: 'Menu Autocomplete',
            sectionFn: () => {
              return (
                <Autocomplete
                  id='programming-languages-menu'
                  label='Programming language'
                  placeholder='Javascript'
                  data={langs}
                />
              )
            }
          },
          {
            title: 'Inline Autocomplete',
            sectionFn: () => {
              return (
                <Autocomplete
                  id='programming-languages-inline'
                  label='Programming language'
                  placeholder='Javascript'
                  data={langs}
                  inline
                />
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Autocompletes', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
