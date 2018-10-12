# Changelog

## 4.19.2 (2018-09-14)

- lib/colors.css was not being built correctly because of a change in node-sass. The syntax has been updated to work with the newer node-sass as well as pinning kuali-ui to the current version of node-sass.

## 4.19.0 (2018-09-05)

- add 'skip to main content' hidden link in grayjoy layout for a11y

## 4.18.1 (2018-08-31)

- change 'hide' to 'collapse menu' in Grayjoy sidebar

## 4.18.0 (2018-08-22)

- `innerRef` prop for button

## 4.17.1 (2018-08-10)

- expose `type` prop for button, with validation and default

## 4.17.0 (2018-08-01)

- Add warning on publish from non-master
- improve the menu component

## 4.16.9 (2018-07-27)

- add drag indicator icon
- The following packages moved into peerDependencies: react-md, react-transition-group, prop-types (This helps consuming apps have more control over what version is used)

## 4.14.15 (2017-10-04)

- removing `!important` from several styles

## 4.14.14 (2017-09-21)

- updating button & dialog styles

## 4.14.13 (2017-09-21)

- update PropTypes to use 'prop-types' package

## 4.14.11 (2017-09-08)

- add badge and icon support to JumpToMenu
- fix direction of arrow on navlist

## 4.14.10 (2017-09-06)

- adds a 1/4 option to `<FieldCells />`

## 4.14.9 (2017-09-01)

- update datepicker to have a more noticable year toggle

## 4.14.8 (2017-09-01)

- fixes overriding style change needed in standard layout

## 4.14.7 (2017-09-01)

- gives a better hover/active state to nav items

## 4.14.6 (2017-09-01)

- fix typo that would throw warnings

## 4.14.5 (2017-09-01)

- adds option to default nested nav as collapsed
- smooth nav collapse animation

## 4.14.4 (2017-09-01)

- Fix typo in nested nav list expand styles

## 4.14.3 (2017-09-01)

- Allows Nested NavLists
- Nested Nav Lists are collapsable
- Nested Nav Lists used with the StandardLayout are collapsed when menu is collapsed

## 4.14 (2017-08-28)

- Fixes some Tab styles
- adds new compressed tab variant

## 4.13.4 (2017-08-23)

- allow icon override in `<Error />`

## 4.13.3 (2017-08-23)

- fix percentage style being displayed as px

## 4.13.2 (2017-08-23)

- remove `user` prop requirements on `<Header />`
- limit available widths on `<FieldCell />`
- add disabled state to `<FieldCell />`

## 4.13.1 (2017-08-22)

- fixes line indicators on form fields when used with gridded form

## 4.13.0 (2017-08-22)

- add Error component

## 4.12.1 (2017-08-22)

- fix the export of `<Paper />`

## 4.12.0 (2017-08-22)

- Form Overhaul
  - darken labels - KUI-13
  - add `<Label />` for more custimization
  - add `<FieldCell />`
  - **BREAKING** change `<Form />` layout styles/classnames
  - focus label on cell click - KUI-14
- **BREAKING** change react-md color overrides

## 4.11.0 (2017-08-15)

- Refactors `<MenuButton />` to use our kuali-ui styles buttons

## 4.10.0 (2017-08-15)

- changes dialog layout css to not use flexbox. fixes ie11 issues

## 4.9.7 (2017-08-2)

- support butons with string icon name

## 4.9.6 (2017-08-2)

- make backstopJS a devDependency

## 4.9.5 (2017-08-2)

- fix bug with Icon className inside a Button component
- add tooltip support to Button
- add icon and button variants

## 4.9.2 (2017-08-2)

- center aligns button text for multiline text

## 4.9.1 (2017-08-1)

- left aligns button text for multiline text

## 4.9.0 (2017-07-31)

- **BREAKING** replace react-md `<Button />` with new custom component
  - use flexbox for button elements
  - fixes buttons with long text, expands vertically
  - adds spacing between buttons in sequence
  - remove prop options - let me know if this breaks functionality
    - forceIconSize
    - forceIconFontSize
    - floating
    - fixed
    - fixedPosition
    - mini
    - primary
    - secondary
    - tooltip
    - tooltipDelay
    - tooltipLabel
    - tooltipPosition
    - type
- **BREAKING** icons that are children of Buttons need to be an Icon component
- **BREAKING** remove react-md `<AddButton />` component
- add css regression testing

## 4.8.2 (2017-07-25)

- Add column selection to `<FilterEditor />`

## 4.8.0 (2017-07-24)

- New styles for `<FilterEditor />`

## 4.7.0 (2017-06-26)

- Fix height bug with Dialoags in ie11

## 4.6.1 (2017-06-05)

- Fix scrolling bug for `<StandardLayout />` in Firefox

## 4.6.0 (2017-05-22)

- **BREAKING** require onBrandSelected prop on Header
- **BREAKING** remove titleContainer prop from Header

## 4.5.0 (2017-05-22)

- Refactoring colors(add palette vars/mixins to sass)
- new `extract-sass-vars-loader` webpack loader to import sass vars into js
- **BREAKING** remove old color sass vars

## 4.4.2 (2017-05-10)

- fix regression in `<NavListItem />`

## 4.4.0 (2017-05-10)

- **BREAKING** - Change `container` prop on `<NavListItem />` to take a string or uninstantiated component

## 4.3.0 (2017-05-10)

- Add `<Popover />` component

## 4.2.2 (2017-04-21)

- add time rules to FilterEditor

## 4.2.1 (2017-04-21)

## 4.2.0 (2017-04-21)

- Removed `<KualiHeader />` component. It is replaced by the new `<Header />` component.
- Added the `<BrandLogo />`
- Added the Logo to the Header
