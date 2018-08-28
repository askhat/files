import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import Chart from 'react-google-charts'

export default class Stats extends Component {
  render = () => {
    const { props } = this

    return (<Chart
      key={props.chartType}
      chartType={props.chartType}
      loader={<Dimmer active inverted>
        <Loader>Stats&nbsp;are&nbsp;loading...</Loader>
      </Dimmer>}
      options={{ title: props.title, legend: false }}
      height='80vh'
      data={[
        ['Word', 'Occurences'],
        ...props.data.slice(0, props.limit || props.data.length)
      ]}/>)
  }
}
