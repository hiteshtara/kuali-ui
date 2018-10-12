/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

/* eslint-disable react/prop-types */

import React from 'react'

import Center from '../../../.storybook/components/center'
import WithChapters from '../../../.storybook/components/with-chapters'
import toggleable from '../../../.storybook/mixins/toggleable'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Lorem from 'react-lorem-component'
import { Icon, RaisedButton } from '../..'

import { DatePicker } from '../../pickers'

import Dialog from '..'

import DialogStoryWrapper from './components/story-wrapper'
import DialogPlayground from './components/playground'

const storiesWithChapters = {
  usage: {
    chapters: [
      {
        title: '<Dialog /> Component',
        info: 'description here',
        sections: [
          {
            title: 'Simple Dialog',
            sectionFn: () => {
              function SimpleExample ({ isVisible, onClose, onToggle }) {
                return (
                  <div>
                    <RaisedButton label='Open Dialog' onClick={onToggle} />
                    <Dialog
                      id='simple-dialog'
                      onHide={onClose}
                      title='Simple Dialog'
                      visible={isVisible}
                    >
                      <Lorem />
                    </Dialog>
                  </div>
                )
              }

              const Wrapped = toggleable()(SimpleExample)
              return <Wrapped />
            }
          },
          {
            title: 'Dialog with Action Buttons',
            sectionFn: () => {
              const closeBtn = (
                <RaisedButton onClick={action('onCancel')} label='Cancel'>
                  <Icon name='close' />
                </RaisedButton>
              )

              const deleteBtn = (
                <RaisedButton onClick={action('onDelete')} label='Delete'>
                  <Icon name='delete' />
                </RaisedButton>
              )
              const submitBtn = (
                <RaisedButton onClick={action('onSubmit')} label='Submit'>
                  <Icon name='check' />
                </RaisedButton>
              )

              const actions = [closeBtn, deleteBtn, submitBtn]

              function ActionButtonExample ({ isVisible, onClose, onToggle }) {
                return (
                  <div>
                    <RaisedButton label='Open Dialog' onClick={onToggle} />
                    <Dialog
                      actions={actions}
                      id='simple-dialog'
                      onHide={onClose}
                      title='Dialog with Action Buttons'
                      visible={isVisible}
                    >
                      <Lorem />
                    </Dialog>
                  </div>
                )
              }

              const Wrapped = toggleable()(ActionButtonExample)
              return <Wrapped />
            }
          }
        ]
      }
    ]
  }
}
storiesOf('Dialogs', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', storiesWithChapters.usage)

storiesOf('Dialogs', module)
  .addDecorator(story => <Center>{story()}</Center>)
  .add('playground', () => <DialogPlayground />)
  .add('with short content', () => {
    const content = (
      <Lorem count={1} sentenceLowerBound={1} sentenceUpperBound={2} />
    )
    return (
      <DialogStoryWrapper title='Short Content'>{content}</DialogStoryWrapper>
    )
  })
  .add('with tall content', () => {
    const content = <Lorem paragraphLowerBound={11} paragraphUpperBound={20} />
    return (
      <DialogStoryWrapper title='Tall Content'>{content}</DialogStoryWrapper>
    )
  })
  .add('with wide content', () => {
    const content = (
      <div style={{ width: 1000 }}>
        <Lorem />
      </div>
    )
    return (
      <DialogStoryWrapper title='Wide Content'>{content}</DialogStoryWrapper>
    )
  })
  .add('with a DatePicker', () => {
    const content = (
      <DatePicker
        id='birthdate'
        label='Birthdate'
        lastChild
        disableScrollLocking
        portal
        className='md-cell kuali-form--cell'
        renderNode={document.body}
        autoOk
        formatOptions={{
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }}
      />
    )
    return <DialogStoryWrapper title='DatePicker'>{content}</DialogStoryWrapper>
  })
