/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

export default function deprecated (propType, message) {
  let warned = false

  return (...args) => {
    const [props, propName] = args
    const prop = props[propName]

    if (prop && !warned) {
      warned = true
      console.warn(
        'PropType Warning:',
        message || `prop "${propName}" is deprecated.`
      )
    }

    return propType.call(this, ...args)
  }
}
