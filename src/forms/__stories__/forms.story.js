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
import states from '../../../.storybook/data/states'

import Form, { FieldCell, FieldGroup } from '..'

import { Icon, Label } from '../../'
import TextField from '../../text-fields'
import SelectField from '../../select-fields'
import { DatePicker } from '../../pickers'
import {
  SelectionControl,
  SelectionControlGroup
} from '../../selection-controls'

storiesOf('Forms', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Fields', {
    chapters: [
      {
        title: 'TextField',
        sections: [
          {
            title: 'with a placeholder',
            sectionFn: () => (
              <TextField id='w-placeholder' placeholder='Placeholder Text' />
            )
          },
          {
            title: 'with a floating label',
            sectionFn: () => (
              <TextField
                id='w-floating'
                label='Label Text'
                placeholder='Placeholder Text'
              />
            )
          },
          {
            title: 'with a separate label component',
            sectionFn: () => (
              <div>
                <Label htmlFor='label-field'>Label Text</Label>
                <TextField id='label-field' placeholder='Placeholder Text' />
              </div>
            )
          },
          {
            title: 'with an icon',
            sectionFn: () => (
              <div>
                <TextField
                  id='w-left-icon'
                  label='Label Text'
                  leftIcon={<Icon name='location_on' variant='mint' />}
                  placeholder='Placeholder Text'
                />
                <TextField
                  id='w-right-icon'
                  label='Label Text'
                  placeholder='Placeholder Text'
                  rightIcon={<Icon name='location_on' variant='glacier' />}
                />
              </div>
            )
          },
          {
            title: 'with an error',
            sectionFn: () => (
              <TextField
                error
                label='Label Text'
                id='w-error'
                placeholder='Placeholder Text'
              />
            )
          },
          {
            title: 'with help text',
            sectionFn: () => (
              <TextField
                helpText='This is some help text'
                id='w-help'
                label='Label Text'
                placeholder='Placeholder Text'
              />
            )
          },
          {
            title: 'with error text',
            sectionFn: () => (
              <TextField
                error
                errorText='This is error text'
                label='Label Text'
                id='w-error-text'
                placeholder='Placeholder Text'
              />
            )
          }
        ]
      },
      {
        title: 'SelectField',
        sections: [
          {
            title: 'with a placeholder',
            sectionFn: () => (
              <SelectField
                menuItems={states}
                id='select-w-placeholder'
                itemLabel='name'
                itemValue='abbreviation'
                placeholder='Placeholder Text'
                style={{ minWidth: 200 }}
              />
            )
          },
          {
            title: 'with a floating label',
            sectionFn: () => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <SelectField
                  label='Label Text'
                  menuItems={states}
                  id='select-w-floating'
                  itemLabel='name'
                  itemValue='abbreviation'
                  placeholder='Placeholder Text'
                />
              </div>
            )
          },
          {
            title: 'with a separate label component',
            sectionFn: () => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Label htmlFor='label-select'>Label Text</Label>
                <SelectField
                  menuItems={states}
                  id='label-select'
                  itemLabel='name'
                  itemValue='abbreviation'
                  placeholder='Placeholder Text'
                />
              </div>
            )
          },
          {
            title: 'when displayed as a button',
            subtitle: `doesn't work with a label prop`,
            sectionFn: () => (
              <SelectField
                menuItems={states}
                id='select-as-button'
                itemLabel='name'
                itemValue='abbreviation'
                placeholder='Placeholder Text'
                position={SelectField.Positions.BELOW}
              />
            )
          }
        ]
      },
      {
        title: 'SelectionControl',
        sections: [
          {
            sectionFn: () => (
              <SelectionControl
                id='readDocumentationPage'
                name='simpleCheckboxes[]'
                defaultChecked
                label='This is the Selection Control label'
                type='checkbox'
                value='docPage'
              />
            )
          }
        ]
      }
    ]
  })

storiesOf('Forms', module)
  .add('Naked form', () => (
    <Form style={{ margin: '20px auto', width: '75%' }}>{formContent}</Form>
  ))
  .add('Gridded form', () => (
    <Form showGrid style={{ margin: '20px auto', width: '75%' }}>
      {formContent}
    </Form>
  ))

const formContent = (
  <div>
    <FieldGroup>
      <FieldCell>
        <Label htmlFor='name'>Name</Label>
        <TextField id='name' placeholder='Enter Your Name' />
      </FieldCell>

      <FieldCell>
        <Label htmlFor='title'>Title</Label>
        <TextField id='title' placeholder='Enter A Title' />
      </FieldCell>

      <FieldCell>
        <Label htmlFor='birthdate'>Birthdate</Label>
        <DatePicker
          autoOk
          icon={false}
          rightIcon={<Icon name='date_range' />}
          id='birthdate'
          formatOptions={{
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }}
          placeholder='--'
        />
      </FieldCell>

      <FieldCell>
        <Label htmlFor='city'>City</Label>
        <TextField id='city' placeholder='Where are you?' />
      </FieldCell>
    </FieldGroup>

    <FieldGroup>
      <FieldCell>
        <TextField
          id='name-2'
          label='Floating label'
          placeholder='Enter Your Name'
        />
      </FieldCell>

      <FieldCell>
        <DatePicker
          autoOk
          icon={false}
          label='Floating label'
          rightIcon={<Icon name='date_range' />}
          id='birthdate-2'
          formatOptions={{
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }}
          placeholder='--'
        />
      </FieldCell>

      <FieldCell disabled>
        <Label>City</Label>
        <TextField disabled id='city-2' placeholder='Where are you?' />
      </FieldCell>
    </FieldGroup>

    <FieldGroup>
      <FieldCell>
        <Label>State</Label>
        <SelectField
          id='state'
          menuItems={states}
          itemLabel='name'
          itemValue='abbreviation'
          placeholder='Choose a State'
        />
      </FieldCell>
    </FieldGroup>

    <FieldGroup>
      <FieldCell>
        <Label htmlFor='help'>Field With Help</Label>
        <TextField
          id='help'
          helpText='This field has help text'
          placeholder='Help Field'
        />
      </FieldCell>

      <FieldCell>
        <Label htmlFor='error'>Field With Error</Label>
        <TextField
          id='error'
          error
          errorText='Whoops! Something went wrong'
          placeholder='Error Field'
        />
      </FieldCell>
    </FieldGroup>

    <FieldGroup>
      <FieldCell>
        <Label>Hobbies</Label>
        <SelectionControl
          id='reading'
          name='hobbies'
          label='Reading'
          type='checkbox'
          value='reading'
        />
        <SelectionControl
          id='running'
          name='hobbies'
          label='Running'
          type='checkbox'
          value='running'
        />
        <SelectionControl
          id='swimming'
          name='hobbies'
          label='Swimming'
          type='checkbox'
          value='swimming'
        />
      </FieldCell>

      <FieldCell>
        <Label htmlFor='maritalstatus'>Maritial Status</Label>
        <SelectionControlGroup
          id='maritalstatus'
          aria-label='marital status'
          type='radio'
          name='maritalstatus'
          defaultValue='single'
          controls={[
            {
              label: 'Single',
              value: 'single'
            },
            {
              label: 'Married',
              value: 'married'
            }
          ]}
        />
      </FieldCell>
    </FieldGroup>

    <FieldGroup>
      <FieldCell>
        <Label>U.S. Citizen</Label>
        <SelectionControl
          id='citizen'
          type='switch'
          name='citizen'
          aria-label='citizen'
          defaultChecked
        />
      </FieldCell>
    </FieldGroup>

    <FieldGroup>
      <FieldCell>
        <Label>Life Story</Label>
        <TextField id='lifestory' rows={5} placeholder='Write a story' />
      </FieldCell>
    </FieldGroup>
  </div>
)
