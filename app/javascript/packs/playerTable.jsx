import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { getData } from './fetchUtils'

export class PlayerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], limit: 25, page: 0 }
    this.pageDown = this.pageDown.bind(this);
    this.pageUp = this.pageUp.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.setState( { loading: true });
    let { limit, page } = this.state;
    let url = `undrafted_players?id=${this.props.draft.id}&limit=${limit}&page=${page}`;

    getData(url).then(response => response.json()).then(
      (responseJSON) => {
        this.setState(
          { players: responseJSON.players, total: responseJSON.total, loading: false }
        );
      }
    )
  }

  draftPlayer(event, playerId) {
    debugger;
  }

  teamTable() {
    let table = this.state.players.map((player, index) => {
      return(
        <tr key={index}>
          <td>{index + 1 + this.state.page * this.state.limit}</td>
          <td>{player.name}</td><td>{player.position}</td><td>{player.team}</td>
          <td>{player.bye_week}</td><td>{parseFloat(player.rank).toFixed(2)}</td>
          <td><button className='btn btn-outline-danger' onClick={(e) => { this.draftPlayer(e, player.id)}}>Draft!</button></td>
        </tr>
      )
    })
    return(table)  
  }

  pageUp() {
    // insert logic for max page
    let newStart = (this.state.page + 1) * this.state.limit;
    if(newStart <= this.state.total) {
      this.setState({ page: this.state.page + 1 }, () => { this.getData() });
    }
  }

  pageDown() {
    if(this.state.page !== 0) {
      this.setState({ page: this.state.page - 1 }, () => { this.getData() });
    }
  }

  render() {
    return(
      <div className='col-sm-12'>
        <table className='table table-hover'>
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
            <div className='btn-group'>
              <button className='btn btn-outline-secondary'onClick={this.pageDown}>{'<'}</button>
              <button className='btn btn-outline-secondary' onClick={this.pageUp}>{'>'}</button>
            </div>
          </td></tr>
          </tfoot>
        </table>
      </div>
    )
  }
}