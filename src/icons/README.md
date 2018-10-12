# Icons

Slim wrapper around the react-md `<FontIcon />` component.

## PropTypes
| name      |type       | default     | required      |
|-----------|-----------|-------------|---------------|
| name      | string    | none        | yes           |

## Example Usage

```js
import { Icon } from 'kuali-ui'

export function SomeComponent() {
  return (
    <div>
      <Icons name='add' />
    </div>
  )
}

```

## Available Material Design Icons

This component will complain if you're not using one of the approved icons. This
is so we have a list of all the icons we're using. Feel free to add a
pull-request if you think(or need) an icon to be on the approved list.

Canonical list is in `src/icons/allowed-icons.js`
