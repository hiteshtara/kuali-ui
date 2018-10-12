# KualiHeader
This component can be used to create the common header at the top of Kuali applications.

## PropTypes
|name      |type        |default      |required      |
|----------|------------|-------------|--------------|
|menuItems |*MenuItem*[]|none         | yes          |
|moduleName|string      |none         | yes          |
|usersName |string      |''           | no           |

#### *MenuItem*
|name      |type      |default      |required      |
|----------|----------|-------------|--------------|
|text      |string    |none         | yes          |
|onClick   |function  |none         | yes          |
