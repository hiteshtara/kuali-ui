# Dialogs

Dialog component to use in Kuali's UI.

## `<Dialog />`

### PropTypes
| name            |type       | default     | required      | valid values      |
|-----------------|-----------|-------------|---------------|-------------------|
| showClose       | boolean   | false       | no            |                   |
| showHeader      | boolean   | true        | no            |                   |
| showFooter      | boolean   | true        | no            |                   |
| actionsPosition | string    | center      | no            | left/right/center |
| lastChild       | boolean   | true        | no            |                   |
| focusOnMount    | boolean   | false       | no            |                   |

### Example Usage
```js
import { Dialog } from 'kuali-ui'

export function SomeComponent() {
  return (
    <Dialog
        id='modal-dialog'
        visible={this.state.visible}
        onHide={this.closeDialog}
        title='Modal Dialog'
        showClose
        actions={[
            <Button onClick={this.closeDialog} label='Cancel'>close</Button>,
            <Button onClick={this.closeDialog} label='Delete'>delete</Button>,
            <Button onClick={this.closeDialog} label='Submit'>check</Button>
        ]}
    >
        <div>Some really nice modal content goes here!</div>
    </Dialog>
  )
}

```
