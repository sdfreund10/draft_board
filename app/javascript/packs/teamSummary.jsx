import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { getData } from './fetchUtils'

export class TeamSummary extends React.Component {
  colForPosition(position, decorated) {
    let summary = this.props.summary;
    return(
      <div className='col card' key={position}>
        <div className='row'>{decorated}: {summary.summary[position] || 0}</div>
        {this.positionTable(position)}
      </div>
    )
  }
  positionTable(position) {
    let players = this.props.summary.players.filter((pl) =>{
      return(pl.position === position)
    });
    let playersTable = players.map((player) => {
      return(
        <div className='row h-25' key={player.id}>
          <p>{player.name} - {Math.round(player.rank)}</p>
        </div>
      )
    });
    return(playersTable);
  }
  render() {
    if(this.props.summary) {
      console.log(this.props.summary.players);
      return(
        <div className='container'>
          <div className='row'><h4>{this.props.summary.team.name}</h4></div>
          <div className='row'>
            {this.colForPosition('QB', 'QB')}
            {this.colForPosition('RB', 'RB')}
            {this.colForPosition('WR', 'WR')}
            {this.colForPosition('TE', 'TE')}
            {this.colForPosition('DST', 'D/ST')}
            {this.colForPosition('K', 'K')}
          </div>
        </div>
      )
    } else {
      return(<div/>)
    }
  }
}
