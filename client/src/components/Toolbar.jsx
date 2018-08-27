import React, { Component } from 'react'
import { Menu, Icon, Input, Checkbox, Dropdown, Popup } from 'semantic-ui-react'

export default class Toolbar extends Component {
  render = () => {
    return (<Menu>
      <Popup content='Click to get back' trigger={<Menu.Item>
        <Icon name='arrow left'/>
      </Menu.Item>}/>
      <Popup content='Edit path then press return to navagate' trigger={<Menu.Item>
        <Input transparent className='icon' icon='arrow right'/>
      </Menu.Item>}/>
      <Menu.Menu position='right'>
        <Popup content='Include files in subdirectories' trigger={<Menu.Item>
          <Checkbox label='Recursive'/>
        </Menu.Item>}/>
        <Popup content='Show overall direcory stats' trigger={<Menu.Item>
          Overall
        </Menu.Item>}/>
        <Menu.Item>
            <Dropdown text='Chart type'/>
        </Menu.Item>
      </Menu.Menu>
    </Menu>)
  }
}
