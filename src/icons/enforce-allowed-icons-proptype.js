/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

export default function enforceAllowedIcons (propType, allowed = []) {
  let warned = false

  return (...args) => {
    const [props, propName] = args
    const iconName = props[propName]

    if (iconName && !warned && !allowed.includes(iconName)) {
      warned = true
      console.warn(
        `PropType Warning: Material Icon of action '${iconName}' is not allowed`
      )
    }

    return propType.call(this, ...args)
  }
}
