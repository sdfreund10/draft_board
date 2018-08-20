import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export class FuturePicks extends React.Component {
  currentRound() {
    let { nextPick, teams} = JSON.parse(JSON.stringify(this.props));
    nextPick.pick = 8;
    this.computeSortOrder(nextPick.round, teams);
    return(
      teams.map((el) => {
        let background = this.background(el.pick, nextPick.pick);
        return(<div className={`col-sm-1 border ${background}`} key={el.id}>{el.name}</div>)
      })
    )
  }

  nextRound() {
    let { nextPick, teams} = JSON.parse(JSON.stringify(this.props));
    this.computeSortOrder(nextPick.round + 1, teams);
    return(
      teams.map((el) => {
        return(<div className={`col-sm-1 bg-warning border`} key={el.id}>{el.name}</div>)
      })
    )
  }

  computeSortOrder(round, teams) {
    if(round % 2 === 0) {
      teams.forEach((team) => { team.pick = (team.pick - teams.length -1) * -1 });
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
      <div>
        <div className="row justify-content-sm-center">
          {this.currentRound()}
        </div>
        <div className="row justify-content-sm-center">
          {this.nextRound()}
        </div>
      </div>
    )
  }
}
