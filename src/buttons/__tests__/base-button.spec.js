/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { mount, shallow } from 'enzyme'

import { Icon } from '../..'
import BaseButton from '..'

describe('BaseButton Component', () => {
  it('should render', () => {
    const wrapper = shallow(<BaseButton />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with an Icon', () => {
    const wrapper = shallow(
      <BaseButton>
        <Icon name='done' />
      </BaseButton>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with a string icon name', () => {
    const wrapper = shallow(<BaseButton>done</BaseButton>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should preserve the `className` prop on an Icon child', () => {
    const customClassName = 'the-custom-class'

    const wrapper = mount(
      <BaseButton>
        <Icon name='add' className={customClassName} />
      </BaseButton>
    )

    expect(wrapper.find(Icon).hasClass(customClassName)).toBeTruthy()
  })

  it('should apply a ref callback to button node via innerRef prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<BaseButton innerRef={spy} />)
    expect(spy).toHaveBeenCalled()
    const button = wrapper.find('button').instance()
    expect(spy).toHaveBeenLastCalledWith(button)
  })
})
