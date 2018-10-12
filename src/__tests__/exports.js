/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

/* eslint-disable import/named */

import {
  AccessibleFakeButton,
  AVAILABLE_OPERATORS,
  Autocomplete,
  Avatar,
  BottomNavigation,
  BrandIcon,
  ButtonGroup,
  Card,
  CardActions,
  CardTitle,
  CardText,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Colors,
  DataTable,
  DatePicker,
  Dialog,
  Divider,
  DocumentLayout,
  Drawer,
  EditDialogColumn,
  Error,
  ExpansionList,
  ExpansionPanel,
  FIELD_TYPES,
  FieldCell,
  FieldGroup,
  FileInput,
  FileUpload,
  FilterEditor,
  FlatButton,
  FocusContainer,
  FontIcon,
  Form,
  GrayjoyLayout,
  Header,
  Icon,
  IconButton,
  IconSeparator,
  injectTooltip,
  Label,
  LinearProgress,
  List,
  ListItem,
  ListItemControl,
  Media,
  MediaOverlay,
  Menu,
  MenuButton,
  NavList,
  NavListItem,
  NavigationDrawer,
  OPERATION_TYPES,
  OPERATOR_TYPES,
  Paper,
  Popover,
  Portal,
  Radio,
  RaisedButton,
  SelectField,
  SelectFieldColumn,
  SelectionControl,
  SelectionControlGroup,
  Sidebar,
  Slider,
  Snackbar,
  StandardLayout,
  Subheader,
  Switch,
  Tab,
  Tabs,
  TabsContainer,
  TableBody,
  TableCardHeader,
  TableColumn,
  TableHeader,
  TableRow,
  TablePagination,
  TextField,
  TimePicker,
  TitleBar,
  Toolbar
} from '..'

describe('index file should have valid exports', () => {
  it('Autocomplete', () => {
    expect(Autocomplete).toBeDefined()
  })

  it('AVAILABLE_OPERATORS', () => {
    expect(AVAILABLE_OPERATORS).toBeDefined()
  })

  it('Avatar', () => {
    expect(Avatar).toBeDefined()
  })

  it('BottomNavigation', () => {
    expect(BottomNavigation).toBeDefined()
  })

  it('Brand Icon', () => {
    expect(BrandIcon).toBeDefined()
  })

  it('Button Group', () => {
    expect(ButtonGroup).toBeDefined()
  })

  it('Card', () => {
    expect(Card).toBeDefined()
  })

  it('CardActions', () => {
    expect(CardActions).toBeDefined()
  })

  it('CardText', () => {
    expect(CardText).toBeDefined()
  })

  it('CardTitle', () => {
    expect(CardTitle).toBeDefined()
  })

  it('Chip', () => {
    expect(Chip).toBeDefined()
  })

  it('Checkbox', () => {
    expect(Checkbox).toBeDefined()
  })

  it('CircularProgress', () => {
    expect(CircularProgress).toBeDefined()
  })

  it('Colors', () => {
    expect(Colors).toBeDefined()
  })

  it('DataTable', () => {
    expect(DataTable).toBeDefined()
  })

  it('DatePicker', () => {
    expect(DatePicker).toBeDefined()
  })

  it('Dialog', () => {
    expect(Dialog).toBeDefined()
  })

  it('Divider', () => {
    expect(Divider).toBeDefined()
  })

  it('DocumentLayout', () => {
    expect(DocumentLayout).toBeDefined()
  })

  it('Drawer', () => {
    expect(Drawer).toBeDefined()
  })

  it('EditDialogColumn', () => {
    expect(EditDialogColumn).toBeDefined()
  })

  it('Error', () => {
    expect(Error).toBeDefined()
  })

  it('ExpansionList', () => {
    expect(ExpansionList).toBeDefined()
  })

  it('ExpansionPanel', () => {
    expect(ExpansionPanel).toBeDefined()
  })

  it('FileInput', () => {
    expect(FileInput).toBeDefined()
  })

  it('FileUpload', () => {
    expect(FileUpload).toBeDefined()
  })

  it('FilterEditor', () => {
    expect(FilterEditor).toBeDefined()
  })

  it('FIELD_TYPES', () => {
    expect(FIELD_TYPES).toBeDefined()
  })

  it('FlatButton', () => {
    expect(FlatButton).toBeDefined()
  })

  it('FontIcon', () => {
    expect(FontIcon).toBeDefined()
  })

  it('Form', () => {
    expect(Form).toBeDefined()
  })

  it('FieldGroup', () => {
    expect(FieldGroup).toBeDefined()
  })

  it('FieldCell', () => {
    expect(FieldCell).toBeDefined()
  })

  it('GrayjoyLayout', () => {
    expect(GrayjoyLayout).toBeDefined()
  })

  it('Header', () => {
    expect(Header).toBeDefined()
  })

  describe('Helpers', () => {
    it('AccessibleFakeButton', () => {
      expect(AccessibleFakeButton).toBeDefined()
    })
    it('Collapse', () => {
      expect(Collapse).toBeDefined()
    })
    it('FocusContainer', () => {
      expect(FocusContainer).toBeDefined()
    })
    it('IconSeparator', () => {
      expect(IconSeparator).toBeDefined()
    })
    it('Portal', () => {
      expect(Portal).toBeDefined()
    })
  })

  it('Icon', () => {
    expect(Icon).toBeDefined()
  })

  it('IconButton', () => {
    expect(IconButton).toBeDefined()
  })

  it('injectTooltip', () => {
    expect(injectTooltip).toBeDefined()
  })

  it('Label', () => {
    expect(Label).toBeDefined()
  })

  it('LinearProgress', () => {
    expect(LinearProgress).toBeDefined()
  })

  it('List', () => {
    expect(List).toBeDefined()
  })

  it('ListItem', () => {
    expect(ListItem).toBeDefined()
  })

  it('ListItemControl', () => {
    expect(ListItemControl).toBeDefined()
  })

  it('Media', () => {
    expect(Media).toBeDefined()
  })

  it('MediaOverlay', () => {
    expect(MediaOverlay).toBeDefined()
  })

  it('Menu', () => {
    expect(Menu).toBeDefined()
  })

  it('MenuButton', () => {
    expect(MenuButton).toBeDefined()
  })

  it('NavigationDrawer', () => {
    expect(NavigationDrawer).toBeDefined()
  })

  it('NavList', () => {
    expect(NavList).toBeDefined()
  })

  it('NavListItem', () => {
    expect(NavListItem).toBeDefined()
  })

  it('OPERATION_TYPES', () => {
    expect(OPERATION_TYPES).toBeDefined()
  })

  it('OPERATOR_TYPES', () => {
    expect(OPERATOR_TYPES).toBeDefined()
  })

  it('Paper', () => {
    expect(Paper).toBeDefined()
  })

  it('Popover', () => {
    expect(Popover).toBeDefined()
  })

  it('Radio', () => {
    expect(Radio).toBeDefined()
  })

  it('RaisedButton', () => {
    expect(RaisedButton).toBeDefined()
  })

  it('SelectionControl', () => {
    expect(SelectionControl).toBeDefined()
  })

  it('SelectionControlGroup', () => {
    expect(SelectionControlGroup).toBeDefined()
  })

  it('SelectField', () => {
    expect(SelectField).toBeDefined()
  })

  it('SelectFieldColumn', () => {
    expect(SelectFieldColumn).toBeDefined()
  })

  it('Sidebar', () => {
    expect(Sidebar).toBeDefined()
  })

  it('Slider', () => {
    expect(Slider).toBeDefined()
  })

  it('Snackbar', () => {
    expect(Snackbar).toBeDefined()
  })

  it('StandardLayout', () => {
    expect(StandardLayout).toBeDefined()
  })

  it('Subheader', () => {
    expect(Subheader).toBeDefined()
  })

  it('Switch', () => {
    expect(Switch).toBeDefined()
  })

  it('Tab', () => {
    expect(Tab).toBeDefined()
  })

  it('TableBody', () => {
    expect(TableBody).toBeDefined()
  })

  it('TableCardHeader', () => {
    expect(TableCardHeader).toBeDefined()
  })

  it('TableColumn', () => {
    expect(TableColumn).toBeDefined()
  })

  it('TableHeader', () => {
    expect(TableHeader).toBeDefined()
  })

  it('TableRow', () => {
    expect(TableRow).toBeDefined()
  })

  it('TablePagination', () => {
    expect(TablePagination).toBeDefined()
  })

  it('Tabs', () => {
    expect(Tabs).toBeDefined()
  })

  it('TabsContainer', () => {
    expect(TabsContainer).toBeDefined()
  })

  it('TextField', () => {
    expect(TextField).toBeDefined()
  })

  it('TimePicker', () => {
    expect(TimePicker).toBeDefined()
  })

  it('TitleBar', () => {
    expect(TitleBar).toBeDefined()
  })

  it('Toolbar', () => {
    expect(Toolbar).toBeDefined()
  })
})
