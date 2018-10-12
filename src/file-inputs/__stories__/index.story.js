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

import { FileInput } from '..'

const stories = {
  usage: {
    subtitle: 'File Inputs',
    chapters: [
      {
        sections: [
          {
            title: 'File Inputs ',
            sectionFn: () => {
              return (
                <div className='file-inputs'>
                  <FileInput
                    id='image-input-1'
                    accept='image/*'
                    name='images'
                  />
                  <FileInput
                    id='image-input-2'
                    accept='image/*'
                    name='images'
                    flat
                  />
                  <FileInput
                    id='image-input-4'
                    accept='image/*'
                    name='images'
                    disabled
                  />
                  <FileInput
                    id='image-input-5'
                    accept='image/*'
                    name='images'
                    flat
                    disabled
                    iconBefore
                  />
                  <FileInput
                    id='image-input-6'
                    accept='image/*'
                    name='images'
                    icon={null}
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

storiesOf('File Inputs', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
