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

import TextField from '..'
import { IconButton } from '../../buttons'
import Icon from '../../icons'

const stories = {
  usage: {
    subtitle: 'Text Fields',
    chapters: [
      {
        sections: [
          {
            title: 'Text Field Labels',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <TextField
                    id='floating-center-title'
                    label='Title'
                    lineDirection='center'
                    placeholder='Hello World'
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='floating-multiline'
                    label='Multi line'
                    lineDirection='right'
                    rows={2}
                    placeholder='Hello World'
                    className='md-cell md-cell--bottom'
                  />
                </div>
              )
            }
          },
          {
            title: 'Placeholder text',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <TextField
                    id='placeholder-only-title'
                    placeholder='Title'
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='placeholder-only-multiline'
                    placeholder='Multi line'
                    rows={2}
                    className='md-cell md-cell--bottom'
                  />
                </div>
              )
            }
          },
          {
            title: 'Textfields with icons',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <TextField
                    id='phone-number-with-icon-right'
                    label='Right Icon'
                    type='tel'
                    rightIcon={<Icon name='phone' />}
                    size={10}
                    className='md-cell'
                  />
                  <TextField
                    id='phone-number-with-icon-left'
                    label='Left Icon'
                    type='tel'
                    leftIcon={<Icon name='phone' />}
                    size={10}
                    className='md-cell'
                  />
                  <TextField
                    id='phone-number-with-icon-button'
                    label='Button as icons'
                    rightIcon={
                      <IconButton>
                        <Icon name='settings' />
                      </IconButton>
                    }
                    className='md-cell'
                  />
                </div>
              )
            }
          },
          {
            title: 'Disabled Text Fields',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <TextField
                    id='disabled-floating-label-field'
                    label='Disabled label'
                    disabled
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='disabled-placeholder-field'
                    placeholder='Disabled placeholder'
                    disabled
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='disabled-floating-label-multiline-field'
                    label='Disabled multiline'
                    rows={2}
                    disabled
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='disabled-placeholder-multiline-field'
                    placeholder='Disabled multiline placeholder'
                    rows={2}
                    disabled
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='disabled-floating-label-with-icon'
                    label='Disabled label with icon'
                    disabled
                    className='md-cell md-cell--bottom'
                    leftIcon={<Icon name='date_range' />}
                  />
                </div>
              )
            }
          },
          {
            title: 'User Feedback',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <TextField
                    id='floating-label-counter-field'
                    label='Word Counter'
                    placeholder='Words words words'
                    maxLength={20}
                    className='md-cell md-cell--bottom'
                  />
                  <TextField
                    id='floating-label-help-text-field'
                    label='Static help text'
                    placeholder='Words words words'
                    className='md-cell md-cell--top'
                    helpText='Look at me. I am always here!'
                  />
                  <TextField
                    id='floating-label-focus-help-text-field'
                    label='Focused help text'
                    placeholder='Words words words'
                    className='md-cell md-cell--top'
                    helpOnFocus
                    helpText='I magically appear when the user focuses the text field.'
                  />
                  <TextField
                    id='floating-label-error-text-field'
                    label='Constant error'
                    placeholder='Words words words'
                    className='md-cell md-cell--top'
                    error
                    errorText='Uh oh! It looks like there is a constant error on this field. It should somehow be fixed.'
                  />
                  <TextField
                    id='floating-label-required-error-text-field'
                    required
                    label='Required field'
                    placeholder='Words words words'
                    className='md-cell md-cell--top'
                    helpText='Try to focus and blur this field without adding any input. Then add some content.'
                    errorText='This field is required.'
                  />
                  <TextField
                    id='floating-label-icon-counter-error-text-field'
                    label='Icon and counter'
                    placeholder='Words words words'
                    className='md-cell md-cell--top'
                    leftIcon={<Icon name='feedback' />}
                    maxLength={40}
                    helpText='The icons also gain the error state.'
                  />
                </div>
              )
            }
          },
          {
            title: 'Auto Resize',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <TextField
                    id='autoresizing-2'
                    label='Auto resizing fields'
                    placeholder='Some placeholder'
                    resize={{ min: 200, max: 1000 }}
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

storiesOf('Text Fields', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
