import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { getData } from './fetchUtils'
import { Col, Row } from 'react-bootstrap'

export class TeamSummary extends React.Component {
  colForPosition(position, decorated) {
    let summary = this.props.summary;
    return(
      <Col md={2} key={position}>
        <Row>{decorated}: {summary.summary[position] || 0}</Row>
        {this.positionTable(position)}
      </Col>
    )
  }
  positionTable(position) {
    let players = this.props.summary.players.filter((pl) =>{
      return(pl.position === position)
    });
    let playersTable = players.map((player) => {
      return(
        <Row key={player.id}>
          <p>{player.name} - {Math.round(player.rank)}</p>
        </Row>
      )
    });
    return(playersTable);
  }
  render() {
    if(this.props.summary) {
      return(
        <div className='container'>
          <Row><h4>{this.props.summary.team.name}</h4></Row>
          <Row>
            {this.colForPosition('QB', 'QB')}
            {this.colForPosition('RB', 'RB')}
            {this.colForPosition('WR', 'WR')}
            {this.colForPosition('TE', 'TE')}
            {this.colForPosition('DST', 'D/ST')}
            {this.colForPosition('K', 'K')}
          </Row>
        </div>
      )
    } else {
      return(<div/>)
    }
  }
}
