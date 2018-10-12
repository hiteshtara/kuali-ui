/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import Header from '..'

describe('Header Component', () => {
  it('should render a Header component with correct properties', () => {
    const wrapper = shallow(
      <Header
        id='Header'
        menuItems={[
          {
            primaryText: 'User Settings',
            onClick: () => {}
          }
        ]}
        module={{ name: 'Conflict of Interest' }}
        onBrandSelected={() => {}}
        user={{ name: 'Slartibartfast' }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a Header component with no user or module name', () => {
    const wrapper = shallow(
      <Header id='Header' module={{ name: '' }} onBrandSelected={() => {}} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a Header with a custom logo', () => {
    const wrapper = shallow(
      <Header
        id='Header'
        module={{ name: 'COI' }}
        onBrandSelected={() => {}}
        Logo={<img src='https://localhost/logo.png' />}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
