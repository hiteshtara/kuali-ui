/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import { TabsContainer, Tabs, Tab } from '..'

describe('Tabs Component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <TabsContainer>
        <Tabs tabId='tab'>
          <Tab label='First'>
            <h3>First Tab</h3>
            <p>tab content</p>
          </Tab>

          <Tab label='Second'>
            <h3>Second Tab</h3>
            <p>tab content</p>
          </Tab>
        </Tabs>
      </TabsContainer>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
