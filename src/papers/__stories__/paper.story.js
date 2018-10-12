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
import { Paper } from '../..'

storiesOf('Paper', module)
  .addDecorator(story => <Center>{story()}</Center>)
  .add('default', () => (
    <Paper style={{ padding: 15, width: '80%' }}>
      <h2>A paper component</h2>
      <Lorem count={1} />
    </Paper>
  ))
