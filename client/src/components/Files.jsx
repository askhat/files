import React, { Component } from 'react'
import { List, Checkbox } from 'semantic-ui-react'
import fileIcon from '../lib/file_icon'

export default class Files extends Component {
  showCheckbox = ({ currentTarget }) => {
    currentTarget.childNodes.forEach(node => console.log(node))
  }

  render = () => {
    return (<List divided relaxed>
      {this.props.canGoBack && <List.Item
        onDoubleClick={() => {
            this.props.onSelectItem({ type: 'directory', path: '..'})
        }}>
        <List.Icon
          name='folder open'
          size='large'
          verticalAlign='middle'/>
        <List.Content>
          <List.Header>..</List.Header>
          <List.Description>Back to the parent directory</List.Description>
        </List.Content>
      </List.Item>}

      {this.props.listing.map(file => {
        return (<List.Item
            key={file.path}
            onDoubleClick={() => this.props.onSelectItem(file)}>
          <div style={flex}>
            <div style={flex}>
              <List.Icon
                name={fileIcon(file.type)}
                size='large'
                verticalAlign='middle'/>
              <List.Content>
                <List.Header>{file.name}</List.Header>
                <List.Description>{file.type}</List.Description>
              </List.Content>
            </div>
            <Checkbox/>
          </div>
        </List.Item>)
      })}
    </List>)
  }
}

const flex = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}
