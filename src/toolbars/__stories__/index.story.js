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
import './index.scss'

import Toolbar from '..'
import { IconButton } from '../../buttons'
import Icon from '../../icons'

const nav = (
  <IconButton>
    <Icon name='menu' />
  </IconButton>
)
const Menu = (
  <IconButton>
    <Icon name='more_vert' />
  </IconButton>
)

const stories = {
  usage: {
    subtitle: 'Toolbars',
    chapters: [
      {
        sections: [
          {
            title: 'Toolbars',
            sectionFn: () => {
              return (
                <div className='toolbars__examples'>
                  <Toolbar nav={nav} title='Transparent' actions={Menu} />
                  <Toolbar themed nav={nav} title='Themed' actions={Menu} />
                  <Toolbar colored nav={nav} title='Colored' actions={Menu} />
                  <Toolbar
                    colored
                    prominent
                    nav={nav}
                    title='Prominent'
                    actions={Menu}
                  />
                  <Toolbar
                    colored
                    prominentTitle
                    nav={nav}
                    title='Prominent Title'
                    actions={Menu}
                  />
                </div>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Toolbars', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
