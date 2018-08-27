import React, { Component } from 'react'
import { Segment, Dimmer, Loader, Menu, Checkbox, Dropdown, Popup } from 'semantic-ui-react'
import Chart from 'react-google-charts'

export default class Stats extends Component {
  state = {
    currentChartType: 'BarChart',
    chartTypes: ['BarChart', 'ColumnChart', 'PieChart']
  }

  switchChartType = (e, { value: currentChartType }) => {
    this.setState({ currentChartType })
  }

  render = () => {
    const { state } = this
    return (<Segment basic>
      <Menu secondary>
        <Popup content='Select all files in current directory' trigger={<Menu.Item>
          <Checkbox label='Overall' onChange={this.props.onSelectOverall}/>
        </Menu.Item>}/>
        <Menu.Item>
          <Dropdown
            text={state.currentChartType}
            onChange={this.switchChartType}
            options={state.chartTypes.map(o => ({text: o, value: o}))}/>
        </Menu.Item>
      </Menu>
      <Chart
        key={state.currentChartType}
        chartType={state.currentChartType}
        loader={<Dimmer active inverted><Loader>Stats&nbsp;are&nbsp;loading</Loader></Dimmer>}
        options={{ title: this.props.title, legend: false }}
        height='80vh'
        data={[
          ['Word', 'Occurences'],
          ...this.props.data
        ]}/>
    </Segment>)
  }
}
