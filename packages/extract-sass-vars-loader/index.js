/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
const sassExtract = require('sass-extract')
const { parseObject } = require('./utils')

module.exports = exports = function extractSassVars (content) {
  const callback = this.async()
  this.cacheable()

  return sassExtract
    .render({ file: this.resourcePath })
    .then(rendered => {
      const parsedVars = parseObject(rendered.vars).global

      this.value = [parsedVars]
      const result = `module.exports = ${JSON.stringify(parsedVars)};`

      rendered.stats.includedFiles.forEach(includedFile => {
        this.addDependency(includedFile)
      })

      callback(null, result)
    })
    .catch(err => {
      if (err.file) this.addDependency(err.file)
      callback(err)
    })
}
