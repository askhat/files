import React, { Component } from 'react'
import { List, Checkbox } from 'semantic-ui-react'
import fileIcon from '../lib/file_icon'
import isTxt from '../lib/is_txt'
import isDir from '../lib/is_dir'

export default class Files extends Component {
  render = () => {
    const { props } = this

    return (<List divided relaxed>
      {props.canGoBack && <List.Item
        onDoubleClick={() => props.onSelectItem({ type: 'directory', path: '..'})}>
        <List.Icon
          name='folder open'
          size='large'
          verticalAlign='middle'/>
        <List.Content>
          <List.Header>..</List.Header>
          <List.Description>Back to the parent directory</List.Description>
        </List.Content>
      </List.Item>}

      {props.listing.map(file => {
        return (<List.Item
            key={file.path}
            onDoubleClick={() => props.onSelectItem(file)}>
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
            <Checkbox
              checked={file.showStats}
              disabled={!(isDir(file.type) || isTxt(file.type))}
              onChange={(e, data) => props.onCheckItem(e, data, file)}/>
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
