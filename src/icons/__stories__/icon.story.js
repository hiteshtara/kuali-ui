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

import Icon, { supportedVariants } from '..'
import allowedIcons from '../allowed-icons'

import IconGroup from './components/icon-group'
import IconPreview from './components/icon-preview'

const stories = {
  usage: {
    chapters: [
      {
        title: '<Icon /> Component',
        info: 'description here',
        sections: [
          {
            sectionFn: () => (
              <div>
                <Icon name='check' style={{ fontSize: 80 }} />
                <Icon name='help_outline' style={{ fontSize: 80 }} />
                <Icon name='star_half' style={{ fontSize: 80 }} />
              </div>
            )
          }
        ]
      },
      {
        title: 'Material Icons',
        info: 'Material Design Icons',
        sections: [
          {
            sectionFn: () => (
              <IconGroup>
                {allowedIcons.map((name, index) => (
                  <IconPreview key={index} name={name} />
                ))}
              </IconGroup>
            )
          }
        ]
      },
      {
        title: 'Color Variations',
        info: 'description here',
        sections: [
          {
            sectionFn: () => (
              <div>
                <Icon name='check' style={{ fontSize: 80 }} variant='success' />
                <Icon name='block' style={{ fontSize: 80 }} variant='error' />
              </div>
            )
          },
          {
            sectionFn: () => {
              return (
                <IconGroup>
                  {supportedVariants.map((variation, index) => (
                    <IconPreview
                      name='favorite'
                      key={index}
                      variant={variation}
                    />
                  ))}
                </IconGroup>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Icons', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
