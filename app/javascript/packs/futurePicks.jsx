import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Col, ButtonGroup, Button } from 'react-bootstrap';

export class FuturePicks extends React.Component {
  currentRound() {
    let { nextPick, teams} = JSON.parse(JSON.stringify(this.props));
    this.computeSortOrder(nextPick.round, teams);
    return(
      teams.map((el) => {
        let background = this.background(el.pick, nextPick.pick);
        return(
          <a className={`btn btn-sm btn-secondary w-100 ${background}`}
             key={el.id} onClick={(e) => { this.props.viewTeam(el) }}>
            {el.name}
          </a>
        )
      })
    )
  }

  nextRound() {
    let { nextPick, teams} = JSON.parse(JSON.stringify(this.props));
    this.computeSortOrder(nextPick.round + 1, teams);
    return(
      teams.map((el) => {
        return(
          <a className='btn btn-sm btn-secondary w-100 bg-warning'
             key={el.id} onClick={(e) => { this.props.viewTeam(el) }}>
            {el.name}
          </a>
        )
      })
    )
  }

  computeSortOrder(round, teams) {
    if(round % 2 === 0) {
      teams.forEach((team) => { team.pick = (team.pick - teams.length - 1) * -1 });
    }
    return(teams.sort((a, b) => { return(a.pick - b.pick) }));
  }

  background(teamPick, currentPick) {
    if (teamPick < currentPick) {
      return('bg-light')
    } else if (teamPick === currentPick) {
      return('bg-success')
    } else {
      return('bg-warning')
    }
  }

  render() {
    return(
      <Col sm={10} smOffset={1}>
        <ButtonGroup justified>
          {this.currentRound()}
        </ButtonGroup>
        <ButtonGroup justified>
          {this.nextRound()}
        </ButtonGroup>
      </Col>
    )
  }
}
