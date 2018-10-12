/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import './style.scss'

import { getStorybook, configure, setAddon } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters'

setAddon(chaptersAddon)

const req = require.context('../src', true, /\.story\.js$/)

function load () {
  req.keys().forEach(req)
}

setDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: true
  }
})

setOptions({
  name: 'kuali-ui',
  url: 'https://github.com/kualico/kuali-ui',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: false,
  addonPanelInRight: true
})

configure(load, module)

export { getStorybook }
