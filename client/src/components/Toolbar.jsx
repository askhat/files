import React, { Component } from 'react'
import { Menu, Icon, Input, Checkbox, Dropdown, Popup } from 'semantic-ui-react'

export default class Toolbar extends Component {
  switchChartType = (e, { value: currentChartType }) => {
    this.setState({ currentChartType })
  }

  render = () => {
    const { props } = this

    return (<Menu>
      <Popup
        content='Click to get back'
        trigger={<Menu.Item>
          <Icon name='arrow left'/>
        </Menu.Item>}/>

      <Popup
        content='Edit path then press return to navagate'
        trigger={<Menu.Item
          style={{flexGrow: 1}}
          as='div'>
          <Input
            transparent
            className='icon'
            icon='arrow right'
            value={this.props.path}/>
        </Menu.Item>}/>

      <Menu.Item>
          <Dropdown
            text={props.chartType}
            options={props.chartTypes.map(o => ({text: o, value: o}))}
            onChange={props.onSwitchChartType}/>
      </Menu.Item>
    </Menu>)
  }
}
