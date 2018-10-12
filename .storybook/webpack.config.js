/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

const path = require('path')

module.exports = function (storybookBaseConfig, configType) {
  storybookBaseConfig.entry.manager.unshift('babel-polyfill')
  storybookBaseConfig.entry.preview.unshift('babel-polyfill')

  storybookBaseConfig.module.rules.push({
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/
  })
  storybookBaseConfig.module.rules.push({
    test: /\.md$/,
    use: 'raw'
  })
  storybookBaseConfig.module.rules.push({
    test: /\.json$/,
    use: 'json'
  })
  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  })
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    include: path.resolve(__dirname, '..')
  })

  storybookBaseConfig.resolveLoader = {
    alias: {
      'extract-sass-vars': path.resolve(
        __dirname,
        '..',
        'packages',
        'extract-sass-vars-loader'
      )
    }
  }
  storybookBaseConfig.output.library = "[name]";
  return storybookBaseConfig
}
