import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export class TeamsForm extends React.Component {
constructor(props) {
    super(props);
    this.changeName = this.props.changeName;
  }

  createTeamTable() {
    return(this.props.teams.map((team) =>
      <tr key={team.pick}>
        <td>{team.pick}</td>
        <td><input value={team.name} onChange={(e) => this.changeName(e, team)}/></td>
        <td><button className='btn priamary btn-sm' onClick={(e) => this.props.removeTeam(e, team)}>X</button></td>
      </tr>
    ));
  }

  leftTeamTable() {
    let evenTeams = [];
    for(var i = 0; i < this.props.teams.length; i += 2 ) {
      var team = this.props.teams[i];
      evenTeams.push(
        <tr key={team.pick}>
          <td>{team.pick}</td>
          <td><input value={team.name} onChange={(e) => this.changeName(e, team)}/></td>
          <td><button className='btn priamary btn-sm' onClick={(e) => this.props.removeTeam(e, team)}>X</button></td>
        </tr>
      );
    }
    return(evenTeams);
  }

  rightTeamTable() {
    let oddTeams = [];
    for(var i = 1; i < this.props.teams.length; i += 2 ) {
      var team = this.props.teams[i];
      oddTeams.push(
        <tr key={team.pick}>
          <td>{team.pick}</td>
          <td><input value={team.name} onChange={(e) => this.changeName(e, team)}/></td>
          <td><button className='btn priamary btn-sm' onClick={(e) => this.props.removeTeam(e, team)}>X</button></td>
        </tr>
      );
    }
    return(oddTeams);
  }

  render() {
    return(
      <div className='row'>
        <div className='col-sm-6'>
          <table className='table table-sm'>
            <tbody>
              {this.leftTeamTable()}
            </tbody>
          </table>
        </div>
        <div className='col-sm-6'>
          <table className='table table-sm'>
            <tbody>
              {this.rightTeamTable()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
