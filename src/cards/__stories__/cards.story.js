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

import { Card, CardTitle, CardText, CardActions } from '..'
import { FlatButton } from '../../buttons'

const stories = {
  usage: {
    chapters: [
      {
        title: '<Card /> Component',
        sections: [
          {
            title: 'Basic',
            sectionFn: () => {
              return (
                <Card>
                  <CardTitle title='Card title' subtitle='Card subtitle' />
                  <CardText>
                    <p>Card content</p>
                  </CardText>
                </Card>
              )
            }
          },
          {
            title: 'Expandable',
            sectionFn: () => {
              return (
                <Card>
                  <CardTitle title='Card title' subtitle='Card subtitle' />
                  <CardActions expander>
                    <FlatButton label='Action' />
                    <FlatButton label='Action' />
                  </CardActions>
                  <CardText expandable>
                    <p>Card content</p>
                  </CardText>
                </Card>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Cards', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
