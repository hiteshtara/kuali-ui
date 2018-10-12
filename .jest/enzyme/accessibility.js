/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import assert from 'assert'
import { findDOMNode } from 'react-dom'
import { mount } from 'enzyme'
import axeCore from 'axe-core'

export async function assertComponentIsAccessible (component, axeConfig = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const wrapper = mount(component, { attachTo: container })
  const nodeUnderTest = findDOMNode(wrapper.instance())

  const { violations = [] } = await axeCore.run(nodeUnderTest, axeConfig)

  for (const violation of violations) {
    const { help } = violation

    for (const node of violation.nodes) {
      const { target } = node
      assert.ok(false, `${help} on element ${target}`)
    }
  }

  document.body.removeChild(container)
}
