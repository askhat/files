import React, { Component } from 'react'
import { Container, Grid, Message, Loader, Dimmer } from 'semantic-ui-react'
import Toolbar from './Toolbar.jsx'
import Files from './Files.jsx'
import Stats from './Stats.jsx'
import ls from '../lib/ls'
import wc from '../lib/wc'
import dirname from '../lib/dirname'

export default class App extends Component {
  state = {
    uiLoading: true,
    uiMessage: 'App is loading...',
    path: [],
    currentPath: '',
    fileListing: [],
    wordStats: {},
    wordStatsCache: {}
  }

  componentDidMount = async () => {
    await this.ls()
    this.unlockUi()
  }

  lockUi = (uiMessage = '') => this.setState({ uiLoading: true, uiMessage })
  unlockUi = () => this.setState({ uiLoading: false, uiMessage: '' })

  ls = async path => {
    try {
      const {
        path: currentPath,
        listing: fileListing
      } = await ls(path)
      this.setState({ fileListing, currentPath })
    } catch (e) {
      console.error(e)
    }
  }

  wc = async path => {
    try {
      const wordStats = await wc(path)
      this.setState({ wordStats })
    } catch (e) {
      console.error(e)
    }
  }

  // FIXME
  loadOverallStats = (e, { checked }) => {
    if (checked) {
      this.setState(prevState => ({ wordStatsCache: prevState.wordStats }))
      const textFiles = this.state.fileListing.filter(file => file.type.match(/utf|ascii/))
      const promisedStats = textFiles.map(file => wc(file.path))
      Promise.all(promisedStats).then(allFilesStats => {
        const overallStats = allFilesStats.reduce((acc = [], { stats }) => {
          stats.forEach(el => {
            const existing = acc.find(item => item[0] === el[0])
            if (existing) {
              existing[1] += el[1]
            } else {
              acc.push(el)
            }
          })
          return acc
        }, overallStats)
        this.setState({ wordStats: {path: this.state.currentPath, stats: overallStats} })
      })
    } else {
      this.setState(prevState => ({ wordStats: prevState.wordStatsCache, wordStatsCache: {} }))
    }
  }

  selectHandler = file => {
    switch (file.type) {
      case 'directory':
      case 'archive':
        this.goTo(file.path)
        break
      default:
        this.wc(file.path)
        break
    }
  }

  goTo = async path => {
    this.setState({ wordStats: {} })
    if (path !== '..') {
      this.setState({ path: [...this.state.path, this.state.currentPath], wordStats: [] })
    } else {
      path = this.state.path.slice(-1)[0] || dirname(this.state.currentPath)
      this.setState({ path: this.state.path.slice(0, -1) })
    }
    this.lockUi(`Moving to ${path}`)
    await this.ls(path)
    this.unlockUi()
  }

  render = () => {
    const { state } = this

    return (<Container>
      {state.uiLoading ? <Dimmer active={state.uiLoading} inverted>
        <Loader>{state.uiMessage}</Loader>
      </Dimmer> : <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Toolbar/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Files
              style={unselectable}
              listing={state.fileListing}
              canGoBack={state.currentPath !== '/'}
              onSelectItem={this.selectHandler}/>
          </Grid.Column>
          <Grid.Column>
            {state.wordStats.stats ? <Stats
              onSelectOverall={this.loadOverallStats}
              data={state.wordStats.stats}
              title={state.wordStats.path}/> : <Message>
                <p style={centerAlign}>
                  Double ckick on any text file to show its stats
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
