# ColumnMenu
This component...

## Basic Usage
![Column Menu](https://i.imgsafe.org/0554864bbd.png "Column Menu")
```js
<ColumnMenu 
  data={['one', 'two', 'three']}
  help="help me!"
  match={(value) => value === 'two'}
  onSelect={(selected) => this.setState({selected})}
/>
```

## PropTypes
|name      |type        |default      |required      |
|----------|------------|-------------|--------------|
|column    |function    |none         |no            |
|data      |array or object or function|none|yes     |
|help      |string      |none         |no            |
|match     |any         |none         |yes           |
|onSelect  |function    |none         |yes           |
