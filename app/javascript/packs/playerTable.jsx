import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import { getData, postData } from './fetchUtils';
import { ButtonGroup, Button, SplitButton, MenuItem, Col, Table, FormControl } from 'react-bootstrap';

export class PlayerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], limit: 25, page: 0, searchFilter: '' }
    this.pageDown = this.pageDown.bind(this);
    this.pageUp = this.pageUp.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  componentDidUpdate(test, newState) {
    const prevState = this.state;
    if(prevState.page !== newState.page || prevState.searchFilter !== newState.searchFilter) {
      this.getData();
    }
  }

  getData() {
    this.setState( { loading: true });
    let { limit, page, searchFilter } = this.state;
    let url = `undrafted_players?id=${this.props.draft.id}&limit=${limit}&page=${page}&search=${searchFilter}`;

    getData(url).then(response => response.json()).then(
      (responseJSON) => {
        this.setState(
          { players: responseJSON.players, total: responseJSON.total, loading: false }
        );
      }
    )
  }

  draftPlayer(event, playerId, teamId) {
    event.preventDefault();
    postData('/picks', { pick: {
        player_id: playerId, draft_id: this.props.draft.id,
        limit: this.state.limit, page: this.state.page,
        round: this.props.nextPick.round, pick: this.props.nextPick.pick,
        overall: this.props.nextPick.overall, team_id: teamId
      }
    }).then((response) => response.json()).then(
      (responseJSON) => {
        this.popPlayer(responseJSON);
        this.props.incrementPick(responseJSON);
      }
    )
  }
  popPlayer(playerParams) {
    let players = this.state.players.filter(function(player) {
      return(playerParams.pick.player_id !== player.id)
    });

    players.push(playerParams.player);
    this.setState({ players: players });
  }

  teamTable() {
    let table = this.state.players.map((player, index) => {
      return(
        <tr key={index}>
          <td>{index + 1 + this.state.page * this.state.limit}</td>
          <td>{player.name}</td><td>{player.position}</td><td>{player.team}</td>
          <td>{player.bye_week}</td><td>{parseFloat(player.rank).toFixed(2)}</td>
          <td>
            <SplitButton bsStyle='danger' title='Draft!' key={player.id}
                         className='btn-outline-danger'
                         onClick={(e) => { this.draftPlayer(e, player.id, this.props.nextPickTeam.id)}}
                         id={`draft-${player.name.replace(/\.\s+/g, '-').toLowerCase()}`}>
              {this.teamOptions(player.id)}
            </SplitButton>
          </td>
        </tr>
      )
    })
    return(table)  
  }

  teamOptions(playerId) {
    let teamMenu = this.props.draft.teams.map((team) => {
      return(
        <MenuItem eventKey={team.id} key={team.id}
                  onClick={(e) => { this.draftPlayer(e, playerId, team.id) }}>
          {team.name}
        </MenuItem>)
    });
    return(teamMenu)
  }

  pageUp() {
    // insert logic for max page
    let newStart = (this.state.page + 1) * this.state.limit;
    if(newStart <= this.state.total) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  pageDown() {
    if(this.state.page !== 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  handleSearch(event) {
    this.setState({ searchFilter: event.target.value });
  }

  render() {
    return(
      <Col sm={12}>
        <Col sm={2} smOffset={10}>
          <FormControl type="text" value={this.state.searchFilter} onChange={this.handleSearch}/>
        </Col>
        <Table hover>
        <thead><tr>
          <th/><th>Player</th><th>Position</th><th>Team</th>
          <th>Bye</th><th>Avg Rank</th><th/>
        </tr></thead>
          <tbody>
            {this.teamTable()}
          </tbody>
          <tfoot>
          <tr><td colSpan='7' className='text-right'>
            {this.state.page * this.state.limit + 1}-{this.state.page * this.state.limit + this.state.limit} of {this.state.total}
            {' '}
            <ButtonGroup>
              <Button bsStyle='default' onClick={this.pageDown}>{'<'}</Button>
              <Button bsStyle='default' onClick={this.pageUp}>{'>'}</Button>
            </ButtonGroup>
          </td></tr>
          </tfoot>
        </Table>
      </Col>
    )
  }
}
