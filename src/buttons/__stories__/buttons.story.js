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
import WithChapters from '../../../.storybook/components/with-chapters'

import { Icon } from '../../'
import { ButtonGroup, RaisedButton, FlatButton, IconButton } from '..'
import { supportedVariants } from '../base-button'

const stories = {
  usage: {
    chapters: [
      {
        title: '<RaisedButton /> Component',
        info: 'Raised Buttons',
        sections: [
          {
            sectionFn: () => <RaisedButton label="I'm a Button!" />
          },
          {
            title: 'With Icons',
            sectionFn: () => (
              <div>
                <RaisedButton>
                  <Icon name='info' />
                </RaisedButton>
                <RaisedButton label='Learn More'>
                  <Icon name='info' />
                </RaisedButton>
                <RaisedButton label='Icon After' iconBefore={false}>
                  <Icon name='info' />
                </RaisedButton>
              </div>
            )
          },
          {
            title: 'When Disabled',
            sectionFn: () => (
              <div>
                <RaisedButton disabled>
                  <Icon name='info' />
                </RaisedButton>
                <RaisedButton disabled label='Learn More' />
                <RaisedButton disabled label='Learn More'>
                  <Icon name='info' />
                </RaisedButton>
              </div>
            )
          },
          {
            title: 'Color Variations',
            sectionFn: () => (
              <div>
                {supportedVariants.map((v, key) => (
                  <div key={key} style={{ marginBottom: 20 }}>
                    <RaisedButton variant={v}>
                      <Icon name='info' />
                    </RaisedButton>
                    <RaisedButton label={v} variant={v} />
                    <RaisedButton label={v} variant={v}>
                      <Icon name='info' />
                    </RaisedButton>
                  </div>
                ))}
              </div>
            )
          },
          {
            title: 'Sizes',
            sectionFn: () => {
              const sizes = ['default', 'small']

              return (
                <div>
                  {sizes.map((s, key) => (
                    <div key={key} style={{ marginBottom: 20 }}>
                      <RaisedButton size={s}>
                        <Icon name='info' />
                      </RaisedButton>
                      <RaisedButton label='Learn More' size={s} />
                      <RaisedButton label='Learn More' size={s}>
                        <Icon name='info' />
                      </RaisedButton>
                    </div>
                  ))}
                </div>
              )
            }
          },
          {
            title: 'Block Level Buttons',
            sectionFn: () => (
              <div>
                <RaisedButton block>
                  <Icon name='info' />
                </RaisedButton>
                <RaisedButton block label='With a Label'>
                  <Icon name='info' />
                </RaisedButton>
              </div>
            )
          }
        ]
      },
      {
        title: '<FlatButton /> Component',
        info: 'Flat Buttons',
        sections: [
          {
            sectionFn: () => (
              <div>
                <FlatButton label='No Shadows Here' />
                <FlatButton label='No Shadows With an Icon'>
                  <Icon name='info' />
                </FlatButton>
              </div>
            )
          }
        ]
      },
      {
        title: '<IconButton /> Component',
        info: 'Icon Buttons',
        sections: [
          {
            sectionFn: () => (
              <IconButton>
                <Icon name='info' />
              </IconButton>
            )
          },
          {
            title: 'Color Variations',
            sectionFn: () => (
              <div>
                {supportedVariants.map((v, key) => (
                  <IconButton key={key} variant={v}>
                    <Icon name='info' />
                  </IconButton>
                ))}
              </div>
            )
          }
        ]
      },
      {
        title: '<ButtonGroup /> Component',
        info: 'Button Group',
        sections: [
          {
            sectionFn: () => (
              <ButtonGroup>
                <RaisedButton label='First' />
                <RaisedButton variant='primary' label='Second' />
                <RaisedButton label='Third' />
                <RaisedButton label='Forth' />
              </ButtonGroup>
            )
          }
        ]
      }
    ]
  }
}

storiesOf('Buttons', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)

storiesOf('Buttons', module)
  .addDecorator(story => <Center>{story()}</Center>)
  .add('multiline text', () => {
    const label = 'Button Text That Wraps To Multiple Lines'
    const icon = <Icon name='done' variant='success' />

    return (
      <div style={{ maxWidth: 200 }}>
        <RaisedButton block label={label} />

        <RaisedButton block label={label}>
          {icon}
        </RaisedButton>

        <RaisedButton block label={label} iconBefore={false}>
          {icon}
        </RaisedButton>
      </div>
    )
  })
  .add('disabled buttons with icon variants', () => {
    return (
      <div style={{ maxWidth: 200 }}>
        <RaisedButton block disabled label="I'm a button">
          <Icon name='done' variant='mint' />
        </RaisedButton>
        <RaisedButton block disabled label="I'm a button" variant='success'>
          <Icon name='done' variant='magma' />
        </RaisedButton>
        <RaisedButton block disabled label="I'm a button" variant='error'>
          <Icon name='done' variant='torch' />
        </RaisedButton>
      </div>
    )
  })
  .add('icon with a custom class', () => {
    return (
      <div style={{ maxWidth: 200 }}>
        <RaisedButton block label="I'm a button">
          <Icon className='highlight' name='done' variant='success' />
        </RaisedButton>
      </div>
    )
  })
  .add('with a tooltip', () => {
    return (
      <div style={{ maxWidth: 200 }}>
        <RaisedButton block label="I'm a button" tooltipLabel='a tooltip'>
          <Icon name='done' variant='success' />
        </RaisedButton>
      </div>
    )
  })

storiesOf('Buttons', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('with an icon child that is a string', {
    chapters: [
      {
        sections: [
          {
            info: `
              This is deprecated functionality from react-md that I left in to
              help in upgrading. Please transition to using <Icon /> components
            `,
            sectionFn: () => <RaisedButton label='Buttons!'>done</RaisedButton>
          }
        ]
      }
    ]
  })
