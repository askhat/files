import React, { Component } from 'react'
import { Container, Grid, Message, Loader, Dimmer } from 'semantic-ui-react'
import Toolbar from './Toolbar.jsx'
import Files from './Files.jsx'
import Stats from './Stats.jsx'
import ls from '../lib/ls'
import wc from '../lib/wc'
import dirname from '../lib/dirname'
import joinStats from '../lib/join_stats'
import isTxt from '../lib/is_txt'
import isDir from '../lib/is_dir'

const HOME_DIR = process.env['HOME_DIR']

export default class App extends Component {
  state = {
    uiError: false,
    uiLoading: true,
    uiMessage: 'App is loading...',
    path: '',
    history: [],
    listing: [],
    stats: [],
    statsLimit: 100,
    currentChartType: 'BarChart',
    avaliableChartTypes: ['BarChart', 'ColumnChart', 'PieChart']
  }

  uiLock = (uiMessage = '', uiError) => this.setState({ uiLoading: true, uiMessage, uiError })
  uiUnlock = () => this.setState({ uiLoading: false, uiMessage: '' })

  componentDidMount = async () => {
    try {
      await this.listDirectory()
      await this.loadStats()
      this.uiUnlock()
    } catch (e) {
      this.uiLock(e.message, true)
    }
  }

  listDirectory = async (path = HOME_DIR) => {
    let listing = await ls(path)
    listing = listing.map(file => {
      // Include all text files to stats by default
      return { ...file, ...isTxt(file.type) && { showStats: true } }
    })
    this.setState({ listing, path })
    this.loadStats()
  }

  loadStats = async () => {
    const included = this.state.listing.filter(f => f.showStats)
    const rawStats = await Promise.all(included.map(f => wc(f.path)))
    const stats = joinStats(rawStats)
    this.setState({ stats })
  }

  handleSwitchChartType = (e, { value: currentChartType }) => {
    this.setState({ currentChartType })
  }

  handleToggleFileStats = async (e, { checked: showStats }, file) => {
    this.setState(({ listing }) => ({
      listing: listing.map(f => f === file ? { ...f, showStats } : f)
    }), this.loadStats)
  }

  handleChangeDirectory = async ({ type, path }) => {
    const { state } = this

    if (type === 'directory' || type === 'archive') {
      this.setState({ wordStats: {} })
      if (path !== '..') {
        this.setState({ path: [...state.history, state.path], wordStats: [] })
      } else {
        path = state.history.slice(-1)[0] || dirname(state.path)
        this.setState({ path: state.history.slice(0, -1) })
      }
      this.uiLock(`Moving to ${path}`)
      await this.listDirectory(path)
      this.uiUnlock()
    }
  }

  handleSliceStats = (e, { checked }, statsLimit = 100) => {
    if (!checked) statsLimit = null
    this.setState({ statsLimit })
  }

  render = () => {
    const { state } = this

    return (<Container>
      {state.uiLoading ? <Dimmer active={state.uiLoading} inverted>
        <Loader indeterminate={state.uiError}>{state.uiMessage}</Loader>
      </Dimmer> : <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={16}>

            <Toolbar
              path={state.path}
              chartTypes={state.avaliableChartTypes}
              chartType={state.currentChartType}
              limitChecked={state.statsLimit}
              onSwitchChartType={this.handleSwitchChartType}
              onRecursiveCheck={this.handleRecursive}
              onSliceCheck={this.handleSliceStats}/>

          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={unselectable}>

            <Files
              listing={state.listing}
              canGoBack={state.path !== '/'}
              onSelectItem={this.handleChangeDirectory}
              onCheckItem={this.handleToggleFileStats}/>

          </Grid.Column>
          <Grid.Column>

            {state.stats.length ? <Stats
              chartType={state.currentChartType}
              limit={state.statsLimit}
              data={state.stats}/> : <Message>
                <p style={centerAlign}>
                  Check any item to include in stats
                </p>
              </Message>}

          </Grid.Column>
        </Grid.Row>
      </Grid>}
    </Container>)
  }
}

const unselectable = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  OUserSelect: 'none',
  userSelect: 'none'
}

const centerAlign = {
  textAlign: 'center'
}
