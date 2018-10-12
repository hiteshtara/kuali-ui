/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import FilterEditor from '..'

const noop = () => {}

describe('StandardLayout Component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <FilterEditor
        columns={[]}
        fields={[]}
        filter={undefined}
        onClose={noop}
        onFilterChanged={noop}
        onFilterSaved={noop}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
