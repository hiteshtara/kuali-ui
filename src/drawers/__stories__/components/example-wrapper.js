/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import Drawer from '../..'
import { RaisedButton } from '../../../buttons'
import { Toolbar } from '../../../toolbars'
import { ListItem } from '../../../lists'
import Icon from '../../../icons'

export default class DrawerExample extends PureComponent {
  state = { visible: false, position: 'left' }

  openDrawer = position => {
    this.setState({ visible: true, position })
  }

  closeDrawer = () => {
    this.setState({ visible: false })
  }

  handleVisibility = visible => {
    this.setState({ visible })
  }

  render () {
    const { visible, position } = this.state
    const isLeft = position === 'left'

    const closeBtn = (
      <RaisedButton icon onClick={this.closeDrawer}>
        {isLeft ? 'arrow_back' : 'close'}
      </RaisedButton>
    )
    return (
      <div>
        <RaisedButton
          raised
          onClick={() => {
            this.openDrawer('left')
          }}
          label='Open Drawer Left'
        />
        <RaisedButton
          raised
          onClick={() => {
            this.openDrawer('right')
          }}
          label='Open Drawer Right'
        />
        <Drawer
          id='simple-drawer-example'
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          position={position}
          onVisibilityChange={this.handleVisibility}
          navItems={[
            <ListItem
              key='1'
              leftIcon={<Icon name='chat' />}
              primaryText='Chat'
            />,
            <ListItem
              key='2'
              leftIcon={<Icon name='forum' />}
              primaryText='Forums'
            />,
            <ListItem
              key='3'
              leftIcon={<Icon name='email' />}
              primaryText='Email'
            />
          ]}
          header={
            <Toolbar
              nav={isLeft ? null : closeBtn}
              actions={isLeft ? closeBtn : null}
              className='md-divider-border md-divider-border--bottom'
            />
          }
        />
      </div>
    )
  }
}
