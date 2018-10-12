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
import loremIpsum from 'lorem-ipsum'

import { ExpansionList, ExpansionPanel } from '..'

const stories = {
  usage: {
    subtitle: 'Expansion Panels',
    chapters: [
      {
        sections: [
          {
            title: 'Expansion Panel',
            sectionFn: () => {
              return (
                <ExpansionList className={'md-cell md-cell--12'}>
                  <ExpansionPanel
                    label='I have the best content!'
                    secondaryLabel='You really should click me'
                  >
                    <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
                    <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
                  </ExpansionPanel>
                  <ExpansionPanel
                    label='No, Click Me!'
                    secondaryLabel='My content is waaaay better'
                  >
                    <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
                    <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
                    <p>{loremIpsum({ units: 'paragraphs', count: 1 })}</p>
                  </ExpansionPanel>
                </ExpansionList>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Expansion Panel', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
