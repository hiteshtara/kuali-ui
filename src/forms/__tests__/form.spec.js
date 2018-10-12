/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import Form, { FieldGroup } from '..'
import TextField from '../../text-fields'
import SelectField from '../../select-fields'
import { DatePicker } from '../../pickers'
import {
  SelectionControl,
  SelectionControlGroup
} from '../../selection-controls'

describe('Form Component', () => {
  it('should render grid layout with grid lines', () => {
    const wrapper = shallow(<Form showGrid>{formContent}</Form>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render grid layout without grid lines', () => {
    const wrapper = shallow(<Form>{formContent}</Form>)
    expect(wrapper).toMatchSnapshot()
  })
})

const formContent = (
  <div>
    <FieldGroup>
      <TextField id='name' label='Name' className='md-cell kuali-form--cell' />
      <DatePicker
        id='birthdate'
        label='Birthdate'
        className='md-cell kuali-form--cell'
        autoOk
        formatOptions={{
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }}
      />
      <SelectField
        id='state'
        label='State'
        menuItems={[
          { name: 'Colorado', abbreviation: 'CO' },
          { name: 'Florida', abbreviation: 'FL' },
          { name: 'Indiana', abbreviation: 'IN' },
          { name: 'Utah', abbreviation: 'UT' }
        ]}
        itemLabel='name'
        itemValue='abbreviation'
        className='md-cell kuali-form--cell'
      />
      <TextField
        id='error'
        label='Error'
        className='md-cell kuali-form--cell'
        error
        errorText='Something went very wrong'
      />
    </FieldGroup>
    <FieldGroup>
      <div className='kuali-form--cell'>
        <label className='kuali-form--cell---label' htmlFor='hobbies'>
          Hobbies
        </label>
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
      </div>
      <div className='kuali-form--cell'>
        <SelectionControlGroup
          id='maritalstatus'
          type='radio'
          name='maritalstatus'
          label='Marital Status'
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
      </div>
    </FieldGroup>
    <FieldGroup>
      <div className='kuali-form--cell'>
        <label className='kuali-form--cell---label' htmlFor='citizen'>
          U.S. Citizen
        </label>
        <SelectionControl
          id='citizen'
          type='switch'
          name='citizen'
          defaultChecked
        />
      </div>
    </FieldGroup>
    <FieldGroup>
      <TextField
        id='lifestory'
        label='Life Story'
        className='md-cell kuali-form--cell'
        rows={2}
      />
    </FieldGroup>
  </div>
)
