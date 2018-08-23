import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

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
      <div className='col-sm-10 offset-sm-1'>
        <div className='btn-group d-flex' role='group'>
          {this.currentRound()}
        </div>
        <div className='btn-group d-flex' role='group'>
          {this.nextRound()}
        </div>
      </div>
    )
  }
}
