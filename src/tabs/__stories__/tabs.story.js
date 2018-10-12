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
import Lorem from 'react-lorem-component'

import { Icon } from '../../'
import { TabsContainer, Tabs, Tab } from '..'

const styles = {
  panel: {
    padding: 30
  }
}

const stories = {
  usage: {
    chapters: [
      {
        title: 'Basic',
        sections: [
          {
            sectionFn: () => {
              return (
                <TabsContainer panelStyle={styles.panel}>
                  <Tabs tabId='tab'>
                    <Tab label='First'>
                      <h3>First Tab</h3>
                      <Lorem />
                    </Tab>

                    <Tab label='Second'>
                      <h3>Second Tab</h3>
                      <Lorem />
                    </Tab>
                  </Tabs>
                </TabsContainer>
              )
            }
          }
        ]
      },
      {
        title: 'With Icons',
        sections: [
          {
            sectionFn: () => {
              return (
                <TabsContainer panelStyle={styles.panel}>
                  <Tabs tabId='tab'>
                    <Tab label='First' icon={<Icon name='mood' />}>
                      <h3>First Tab</h3>
                      <Lorem />
                    </Tab>

                    <Tab label='Second' icon={<Icon name='mood_bad' />}>
                      <h3>Second Tab</h3>
                      <Lorem />
                    </Tab>
                  </Tabs>
                </TabsContainer>
              )
            }
          }
        ]
      },
      {
        title: 'variant: compressed',
        sections: [
          {
            sectionFn: () => {
              return (
                <TabsContainer
                  defaultTabIndex={2}
                  panelStyle={styles.panel}
                  variant='compressed'
                >
                  <Tabs tabId='tab'>
                    <Tab label='First'>
                      <h3>First Tab</h3>
                      <Lorem />
                    </Tab>

                    <Tab label='Second'>
                      <h3>Second Tab</h3>
                      <Lorem />
                    </Tab>

                    <Tab label='Third'>
                      <h3>Third Tab</h3>
                      <Lorem />
                    </Tab>

                    <Tab label='Fourth'>
                      <h3>Fourth Tab</h3>
                      <Lorem />
                    </Tab>
                  </Tabs>
                </TabsContainer>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Tabs', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
