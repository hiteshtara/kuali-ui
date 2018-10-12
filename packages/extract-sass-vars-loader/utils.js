/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

function parse ({ type, value }) {
  if (type === 'SassMap') {
    return parseObject(value)
  } else if (type === 'SassList') {
    return value.map(parse)
  } else if (type === 'SassColor') {
    return `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`
  } else {
    return value
  }
}

function parseObject (data = {}) {
  let out = {}

  for (const key in data) {
    if (key === 'global') {
      out[key] = parseObject(data[key])
    } else {
      out[key] = parse(data[key])
    }
  }

  return out
}

module.exports.parse = parse
module.exports.parseObject = parseObject
