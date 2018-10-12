# Buttons

Set of button components to use in Kuali's UI.

## `<RaisedButton />`

### PropTypes
| name      |type       | default     | required      |
|-----------|-----------|-------------|---------------|
| variant   | string    | default     | yes           |

### Example Usage

```js
import { RaisedButton, Icon } from 'kuali-ui'

export function SomeComponent() {
  return (
    <RaisedButton variant='primary' label='Click Me' />
  )
}

```

## `<FlatButton />`

### PropTypes
| name      |type       | default     | required      |
|-----------|-----------|-------------|---------------|
| variant   | string    | default     | yes           |

### Example Usage

```js
import { FlatButton } from 'kuali-ui'

export function SomeComponent() {
  return (
    <FlatButton variant='primary' label='Click Me' />
  )
}

```

## `<IconButton />`

### PropTypes
| name      |type       | default     | required      |
|-----------|-----------|-------------|---------------|
| variant   | string    | default     | yes           |

### Example Usage

```js
import { IconButton } from 'kuali-ui'

export function SomeComponent() {
  return (
    <IconButton variant='primary'>close</IconButton>
  )
}

```

## `<ButtonGroup />`

### PropTypes
| name      |type       | default     | required      |
|-----------|-----------|-------------|---------------|
| children  | array     | none        | yes           |

### Example Usage

```js
import { ButtonGroup, RaisedButton } from 'kuali-ui'

export function SomeComponent() {
  return (
    <ButtonGroup>
      <RaisedButton label='First' />
      <RaisedButton label='Second' />
      <RaisedButton label='Third' />
    </ButtonGroup>
  )
}

```
