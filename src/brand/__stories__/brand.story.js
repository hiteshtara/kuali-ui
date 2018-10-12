/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import { pick } from 'lodash'
import React from 'react'
import { storiesOf } from '@storybook/react'
import WithChapters from '../../../.storybook/components/with-chapters'

// eslint-disable-next-line import/no-webpack-loader-syntax
import colorVars from 'extract-sass-vars!../../_sass/config/_colors.scss'

import Palette, { PaletteGroup } from './components/palettes'
import Swatch, { SwatchGroup } from './components/swatches'

import { BrandLogo } from '..'

storiesOf('Brand', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Kuali', {
    subtitle: 'The Kuali Brand',
    chapters: [
      {
        title: 'LogoType',
        info: 'description here',
        sections: [
          {
            sectionFn: () => <BrandLogo style={{ maxWidth: 400 }} />
          }
        ]
      },
      {
        title: 'Colors',
        info: 'Our Color System',
        sections: [
          {
            title: 'Primary Colors',
            subtitle:
              'Our cool primary colors reinforce the fresh and modern feel of our brand.',
            sectionFn: () => {
              const primary = pick(colorVars['$palettes'], [
                'wintergreen',
                'frost',
                'glacier',
                'mint',
                'popsicle'
              ])

              return (
                <PaletteGroup>
                  {Object.keys(primary).map((name, i) => (
                    <Palette
                      title={name}
                      key={`palette-${name}`}
                      tints={primary[name]}
                    />
                  ))}
                </PaletteGroup>
              )
            }
          },
          {
            title: 'Secondary Colors',
            subtitle:
              'Our secondary colors make our designs stand out. These “hot” colors should be used sparingly. Never use more than one of them in a single design.',
            sectionFn: () => {
              const secondary = pick(colorVars['$palettes'], [
                'magma',
                'chili',
                'flare',
                'torch'
              ])
              return (
                <PaletteGroup>
                  {Object.keys(secondary).map((name, i) => (
                    <Palette
                      title={name}
                      key={`palette-${name}`}
                      tints={secondary[name]}
                    />
                  ))}
                </PaletteGroup>
              )
            }
          },
          {
            title: 'Neutral Colors',
            subtitle:
              'We use these neutral grays for backgrounds and subtle highlights as well as text colors.',
            sectionFn: () => {
              const neutral = pick(colorVars['$palettes'], [
                'neutral-dark',
                'neutral-medium',
                'neutral',
                'neutral-light'
              ])
              return (
                <PaletteGroup>
                  {Object.keys(neutral).map((name, i) => (
                    <Palette
                      title={name}
                      key={`palette-${name}`}
                      tints={neutral[name]}
                    />
                  ))}
                </PaletteGroup>
              )
            }
          },
          {
            title: 'Action Colors',
            sectionFn: () => (
              <SwatchGroup>
                <Swatch
                  title='Error'
                  value='#E43935'
                  variableName='$kuali-error-color'
                />
                <Swatch
                  title='Info'
                  value='#468DCB'
                  variableName='$kuali-info-color'
                />
                <Swatch
                  title='Success'
                  value='#9CCB64'
                  variableName='$kuali-success-color'
                />
                <Swatch
                  title='Warning'
                  value='#F7BE1B'
                  variableName='$kuali-warning-color'
                />
              </SwatchGroup>
            )
          }
        ]
      }
    ]
  })
