/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import Lorem from 'react-lorem-component'
import Center from '../../../.storybook/components/center'
import WithChapters from '../../../.storybook/components/with-chapters'

import PopoverStoryWrapper from './components/story-wrapper'

import Icon from '../../icons'

import Popover from '..'

const noop = () => {}

const stories = {
  usage: {
    chapters: [
      {
        title: '<Popover /> Component',
        sections: [
          {
            title: 'Usage',
            sectionFn: () => {
              return (
                <Center style={{ flexDirection: 'row', margin: '60px 0' }}>
                  <Popover
                    content={<Lorem count='1' />}
                    onRequestClose={noop}
                    position='right'
                    title='Popover'
                    trapFocus={false}
                    visible
                  >
                    <Icon name='help_outline' style={{ fontSize: 40 }} />
                  </Popover>
                </Center>
              )
            }
          },
          {
            title: 'Hide Arrow',
            sectionFn: () => {
              return (
                <Center style={{ flexDirection: 'row', margin: '60px 0' }}>
                  <PopoverStoryWrapper title='Hide Arrow' hideArrow />
                </Center>
              )
            }
          },
          {
            title: 'Directions',
            sectionFn: () => {
              return (
                <Center style={{ flexDirection: 'row', margin: '60px 0' }}>
                  <PopoverStoryWrapper title='Top' position='top' />
                  <PopoverStoryWrapper title='Bottom' position='bottom' />
                  <PopoverStoryWrapper title='Left' position='left' />
                  <PopoverStoryWrapper title='Right' position='right' />
                </Center>
              )
            }
          },
          {
            title: 'Align',
            sectionFn: () => {
              return (
                <Center style={{ flexDirection: 'column', margin: '60px 0' }}>
                  <PopoverStoryWrapper
                    title='Top positioned & Left aligned'
                    position='top'
                    align='left'
                  />
                  <PopoverStoryWrapper
                    title='Bottom positioned & Left aligned'
                    position='bottom'
                    align='left'
                  />
                  <PopoverStoryWrapper
                    title='Top positioned & Right aligned'
                    position='top'
                    align='right'
                  />
                  <PopoverStoryWrapper
                    title='Bottom positioned & Right aligned'
                    position='bottom'
                    align='right'
                  />
                  <PopoverStoryWrapper
                    title='Left positioned & Top aligned'
                    position='left'
                    align='top'
                  />
                  <PopoverStoryWrapper
                    title='Right positioned & Top aligned'
                    position='right'
                    align='top'
                  />
                  <PopoverStoryWrapper
                    title='Left positioned & Bottom aligned'
                    position='left'
                    align='bottom'
                  />
                  <PopoverStoryWrapper
                    title='Right positioned & Bottom aligned'
                    position='right'
                    align='bottom'
                  />
                </Center>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Popovers', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
