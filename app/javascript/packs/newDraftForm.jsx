import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { TeamsForm } from './teamsForm'
import {
  Button, Col, Row, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

export class NewDraftForm extends React.Component {
  constructor(props) {
    super(props);
    if(props.draft) {
      this.state = props.draft;
    } else {
      this.state = {
        name: 'New Draft',
        format: 'standard',
        teams: [
          { pick: 1, name: "Team 1" }, { pick: 2, name: "Team 2" },
          { pick: 3, name: "Team 3" }, { pick: 4, name: "Team 4" },
          { pick: 5, name: "Team 5" }, { pick: 6, name: "Team 6" },
          { pick: 7, name: "Team 7" }, { pick: 8, name: "Team 8" },
          { pick: 9, name: "Team 9" }, { pick: 10, name: "Team 10" },
        ]
      };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    this.setState({ [target.id]: target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addDraft(this.state);
  }

  changeTeamName(event, team) {
    let teamIndex = team.pick - 1;
    let teams = this.state.teams;
    teams[teamIndex] = { pick: team.pick, name: event.target.value };
    this.setState({ teams: teams });
  }

  addTeam() {
    let teams = this.state.teams;
    let pickNum = teams.length + 1;
    let newTeam = { pick: pickNum, name: `Team ${pickNum}` };
    teams.push(newTeam);
    this.setState({ teams: teams })
  }

  removeTeam(event, team) {
    let teamIndex = team.pick - 1;
    let teams = this.state.teams;
    teams.splice(teamIndex, 1);
    teams.forEach((team, index) => { team.pick = index + 1 })
    this.setState({ teams: teams });
  }

  render() {
    return(
      <div className='text-center text-primary'>
        <Row>
          { this.props.cancelable && 
            <Col sm={1}>
              <Button bsStyle='danger' onClick={this.props.back}>Back</Button>
            </Col>
          }
          <Col sm={6} smOffset={this.props.cancelable ? 2 : 3}>
            <h1>Create A New Draft</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Col sm={6} smOffset={3}>
            <FormGroup>
              <label>Draft Name</label>
              <FormControl type="text" placeholder={this.state.name} id='name'
                           onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>League Format</ControlLabel>
              <FormControl componentClass="select" id='format'
                           value={this.state.format}
                           onChange={this.handleChange}>
                <option value='standard'>Standard</option>
                <option value='ppr'>PPR</option>
                <option value='half'>Half PPR</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col sm={12}>
            <Button bsSize='small' block onClick={this.addTeam.bind(this)}>
              Add Team
            </Button>
          </Col>
          <TeamsForm teams={this.state.teams}
                     changeName={this.changeTeamName.bind(this)}
                     addTeam={this.addTeam.bind(this)}
                     removeTeam={this.removeTeam.bind(this)}/>
          <Button bsStyle='primary' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
