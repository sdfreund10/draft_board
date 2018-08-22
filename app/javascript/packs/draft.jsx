import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DraftHeader } from './draftHeader'
import { getData } from './fetchUtils'
import { FuturePicks } from './futurePicks'
import { PlayerTable } from './playerTable'

export class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = { picks: [] }
  }

  componentWillMount() {
    this.setState( { loading: true });
    let url = `drafts/${this.props.draft.id}`;

    getData(url).then(response => response.json()).then(
      (responseJSON) => {
        this.setState({ lastPick: responseJSON.pick, loading: false })
      }
    )
  }

  nextPick() {
    let lastPick = this.state.lastPick;
    if(!lastPick) {
      return({ round: 1, pick: 1, overall: 1 })
    } else if(lastPick.pick === this.props.draft.teams.length) {
      return(
        { round: lastPick.round + 1, pick: 1,
          overall: this.props.draft.teams.length * lastPick.round + 1 }
      )
    } else {
      return(
        { round: lastPick.round, pick: lastPick.pick + 1,
          overall: (lastPick.round - 1) * this.props.draft.teams.length + lastPick.pick + 1 }
      )
    }
  }

  incrementPick(pickResponse) {
    this.setState({ lastPick: pickResponse.pick})
  }

  nextPickTeam() {
    let nextPick = this.nextPick();
    let nextPickRaw;
    if (!this.state.lastPick) {
      return(null);
    } else if (nextPick.round % 2 === 0) {
      nextPickRaw = this.props.draft.teams.length - nextPick.pick + 1;
    } else {
      nextPickRaw = nextPick.pick;
    }
    return(
      this.props.draft.teams.find((team) => { return(team.pick === nextPickRaw) })
    )
  }

  render() {
    return(
      <div className='main-content'>
        <DraftHeader draft={this.props.draft} user={this.props.user}
                     back={this.props.back} nextPick={this.nextPick()}/>
        <FuturePicks nextPick={this.nextPick()}
                     numPicks={this.props.draft.teams.length}
                     teams={this.props.draft.teams}/>
        <PlayerTable draft={this.props.draft} nextPick={this.nextPick()}
                     incrementPick={this.incrementPick.bind(this)}
                     nextPickTeam={this.nextPickTeam()}/>
      </div>
    )
  }
}
