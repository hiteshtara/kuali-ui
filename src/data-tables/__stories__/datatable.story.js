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

import PaginationWrapper from './components/pagination-wrapper'
import PlainWrapper from './components/plain-wrapper'
import SortableWrapper from './components/sortable-wrapper'

import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from '..'

const stories = {
  usage: {
    chapters: [
      {
        title: '<DataTable /> Component',
        sections: [
          {
            title: 'Data Table',
            sectionFn: () => {
              return (
                <DataTable baseId='demo-table' indeterminate>
                  <TableHeader>
                    <TableRow>
                      <TableColumn grow>Column 1</TableColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableColumn>Foo</TableColumn>
                    </TableRow>
                    <TableRow>
                      <TableColumn>Bar</TableColumn>
                    </TableRow>
                    <TableRow>
                      <TableColumn>Baz</TableColumn>
                    </TableRow>
                  </TableBody>
                </DataTable>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Data Tables', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
  .add('Simple', () => {
    return <PlainWrapper plain />
  })
  .add('Selection', () => {
    return <PlainWrapper indeterminate />
  })
  .add('Pagination', () => {
    return <PaginationWrapper />
  })
  .add('Sorting', () => {
    return <SortableWrapper />
  })
