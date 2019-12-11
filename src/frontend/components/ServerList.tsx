import React from 'react';
import { Title } from './Title';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { fetchServerList } from '../services';

const UPDATE_SERVER_LIST_INTERVAL = 5000;

export class ServerList extends React.Component {
  state = {
    selected: [1],
    servers: []
  };

  updateServerListInterval: number;

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  componentWillMount() {
    this.fetchServerList();
  }

  fetchServerList() {
    const servers = fetchServerList().
      then((response) => {
        const servers = response.body;
        this.setState({ servers });
      }).
      catch((err) => console.error(err));

    clearInterval(this.updateServerListInterval);

    this.updateServerListInterval = window.setInterval(() => this.fetchServerList(), UPDATE_SERVER_LIST_INTERVAL);
  }

  render () {
    return (
      <React.Fragment>
        <Title>Servers list</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Max Players</TableCell>
              <TableCell>Current Players</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Mode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.servers.map((server, i) => {debugger;return (
              <TableRow key={server.id}>
                <TableCell>{server.id}</TableCell>
                <TableCell>{server.name}</TableCell>
                <TableCell>{server.address}:{server.port}</TableCell>
                <TableCell>{server.maxPlayers}</TableCell>
                <TableCell>{server.players}</TableCell>
                <TableCell>{server.type}</TableCell>
                <TableCell>{server.mode}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
