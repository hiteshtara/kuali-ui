/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'

import Center from '../../../.storybook/components/center'
import Icon from '../../icons'
import { IconSeparator } from '..'

storiesOf('Icon Separator', module)
  .addDecorator(story => <Center>{story()}</Center>)
  .add('default', () => (
    <IconSeparator label='text label'>
      <Icon name='cancel' />
    </IconSeparator>
  ))
  .add('with the icon before', () => (
    <IconSeparator label='text label' iconBefore>
      <Icon name='cancel' />
    </IconSeparator>
  ))
