import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DraftHeader } from './draftHeader'
import { getData } from './fetchUtils'
import { FuturePicks } from './futurePicks'

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
      return({ round: 1, pick: 1 })
    } else if(lastPick.pick === this.props.draft.teams.length) {
      return({ round: lastPick.round + 1, pick: 1 })
    } else {
      return({ round: lastPick.round, pick: lastPick.pick + 1})
    }
  }

  render() {
    return(
      <div className='main-content'>
        <DraftHeader draft={this.props.draft} user={this.props.user} back={this.props.back} nextPick={this.nextPick()}/>
        <FuturePicks nextPick={this.nextPick()} numPicks={this.props.draft.teams.length} teams={this.props.draft.teams}/>
        {this.state.loading && <h1>LOADING</h1>}
        {!this.state.loading && <h1>loaded :)</h1>}
      </div>
    )
  }
}
