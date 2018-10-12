/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import WithChapters from '../../../.storybook/components/with-chapters'

import { Avatar } from '../../avatars'
import { Divider } from '../../dividers'
import Icon from '../../icons'
import { Subheader } from '../../subheaders'
import { List, ListItem, ListItemControl } from '..'
import { Checkbox, SelectionControl } from '../../selection-controls'

const stories = {
  usage: {
    subtitle: 'Lists',
    chapters: [
      {
        sections: [
          {
            title: 'Lists',
            sectionFn: () => {
              return (
                <div className='md-grid'>
                  <List className='md-cell md-paper md-paper--1'>
                    <ListItem primaryText='Lions' />
                    <ListItem primaryText='Tigers' />
                    <ListItem primaryText='Bears' />
                  </List>
                  <List className='md-cell md-paper md-paper--1'>
                    <Subheader primaryText='Characters' />
                    <ListItem
                      leftAvatar={
                        <Avatar icon={<Icon name='lightbulb_outline' />} />
                      }
                      rightIcon={<Icon name='info' />}
                      primaryText='Scarecrow'
                      secondaryText='If I only had a brain'
                    />
                    <ListItem
                      leftAvatar={<Avatar icon={<Icon name='favorite' />} />}
                      primaryText='Tin Man'
                      secondaryText='I sure would like a new heart'
                    />
                    <ListItem
                      leftAvatar={
                        <Avatar icon={<Icon name='accessibility' />} />
                      }
                      primaryText='Lion'
                      secondaryText='Who has some courage to lend me'
                    />
                    <Divider inset />
                    <Subheader primaryText='Songs' />
                    <ListItem
                      leftAvatar={
                        <Avatar
                          suffix='amber'
                          icon={<Icon name='directions_walk' />}
                        />
                      }
                      primaryText='Follow the yellow brick road'
                    />
                    <ListItem
                      leftAvatar={
                        <Avatar suffix='blue' icon={<Icon name='flash_on' />} />
                      }
                      primaryText="We're off to see the wizard"
                    />
                  </List>
                  <List className='md-cell md-paper md-paper--1'>
                    <Subheader primaryText='Three line example' primary />
                    <ListItem
                      leftAvatar={<Avatar suffix='deep-purple'>Oz</Avatar>}
                      primaryText='Brunch this weekend?'
                      secondaryText={
                        "Glinda\nI'll be in the kingdom sometime next week"
                      }
                      threeLines
                    />
                    <ListItem
                      leftAvatar={<Avatar suffix='green'>D</Avatar>}
                      primaryText='Summer BBQ'
                      secondaryText={
                        "to Aunt Em, Uncle Henry\nWish I could come, but I'm out of town this weekend."
                      }
                      threeLines
                    />
                    <ListItem
                      leftAvatar={<Avatar suffix='orange'>A</Avatar>}
                      primaryText='Mwahaha'
                      secondaryText="I'll get you my little pretty. And your little dog too!"
                      threeLines
                    />
                  </List>
                </div>
              )
            }
          },
          {
            title: 'List Controls',
            sectionFn: () => {
              const chat = <Icon key='chat' name='chat' />
              const CLASS_NAME = 'md-cell md-cell--6 md-paper md-paper--1'
              return (
                <div className='md-grid'>
                  <List className={CLASS_NAME}>
                    <ListItemControl
                      rightIcon={chat}
                      primaryAction={
                        <Checkbox
                          id='list-control-chat-1'
                          name='list-control-primary'
                          label='Judy Garland'
                          defaultChecked
                        />
                      }
                    />
                    <ListItemControl
                      rightIcon={chat}
                      primaryAction={
                        <Checkbox
                          id='list-control-chat-2'
                          name='list-control-primary'
                          label='Frank Morgan'
                        />
                      }
                    />
                    <ListItemControl
                      rightIcon={chat}
                      primaryAction={
                        <Checkbox
                          id='list-control-chat-3'
                          name='list-control-primary'
                          label='Margaret Hamilton'
                          defaultChecked
                        />
                      }
                    />
                  </List>
                  <List className={CLASS_NAME}>
                    <ListItemControl
                      leftAvatar={<Avatar suffix='orange'>SC</Avatar>}
                      secondaryAction={
                        <Checkbox
                          id='list-control-secondary-1'
                          name='list-control-secondary'
                          label='Ray Bolger'
                          labelBefore
                          defaultChecked
                        />
                      }
                    />
                    <ListItemControl
                      leftAvatar={<Avatar suffix='grey'>TM</Avatar>}
                      secondaryAction={
                        <Checkbox
                          id='list-control-secondary-2'
                          name='list-control-secondary'
                          label='Jack Haley'
                          labelBefore
                        />
                      }
                    />
                    <ListItemControl
                      leftAvatar={<Avatar suffix='amber'>LN</Avatar>}
                      secondaryAction={
                        <Checkbox
                          id='list-control-secondary-3'
                          name='list-control-secondary'
                          label='Bert Lahr'
                          labelBefore
                          defaultChecked
                        />
                      }
                    />
                  </List>
                  <List className={CLASS_NAME}>
                    <ListItemControl
                      leftIcon={<Icon key='clear' name='clear' />}
                      secondaryAction={
                        <SelectionControl
                          id='toggle-wifi'
                          name='services'
                          label='Ding Dong! The Witch is Dead'
                          labelBefore
                          defaultChecked
                          type='switch'
                        />
                      }
                    />
                    <ListItemControl
                      leftIcon={<Icon key='face' name='face' />}
                      secondaryAction={
                        <SelectionControl
                          id='toggle-bluetooth'
                          name='services'
                          label='The Lollipop Guild'
                          labelBefore
                          type='switch'
                        />
                      }
                    />
                    <ListItem
                      primaryText='Copyright 1939'
                      leftIcon={<Icon key='copyright' name='copyright' />}
                    />
                  </List>
                </div>
              )
            }
          }
        ]
      }
    ]
  }
}

storiesOf('Lists', module)
  .addDecorator(story => <WithChapters>{story()}</WithChapters>)
  .addWithChapters('Usage', stories.usage)
