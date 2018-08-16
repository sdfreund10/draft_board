import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { NewDraftForm } from './newDraftForm'
import { UserLogin } from './userLogin'

class DraftBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drafts: props.drafts, user: props.user }
  }

  addDraft(newDraft) {
    this.postDraft(newDraft).then((response) => {
      console.log(response);
      let drafts = this.state.drafts;
      drafts.push(newDraft);
      this.setState({ drafts: drafts, newDraft: false })
    });
  }

  postDraft(newDraft) {
    let draftData = {
      name: newDraft.name,
      format: newDraft.format,
      user_id: this.state.user.id,
      teams_attributes: newDraft.teams
    };
    return(
      fetch('/drafts', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        body: JSON.stringify({ draft: draftData },)
      })
    );
  }

  setCurrentDraft(event, draft) {
    console.log(draft);
  }

  setUser(responseBody) {
    this.setState( { user: responseBody.user, drafts: responseBody.drafts });
  }

  draftsTable() {
    return(
      this.state.drafts.map((draft, index) =>
        <tr key={index} onClick={(e) => this.setCurrentDraft(e, draft)}>
          <td>{draft.name}</td>
          <td>{draft.format}</td>
          <td>{draft.teams.length}</td>
          <td><button type='button' className='btn-sm bg-danger'>X</button></td>
        </tr>
      )
    )
  }

  render() {
    if (this.state.user === null ) {
      return(<UserLogin setUser={this.setUser.bind(this)}/>);
    } else if (this.state.drafts.length === 0 || this.state.addDraft) {
      return(
        <div className='col-md-12'>
          <NewDraftForm addDraft={this.addDraft.bind(this)} user={this.state.user}
                        cancelable={this.state.addDraft}
                        back={() => this.setState({addDraft: false })}/>
        </div>
      );
    } else if (this.state.currentDraft) {
    } else {
      return(
        <div className='col-md-12 text-center text-primary'>
          <table className='table table-hover'>
            <thead><tr><th>Draft Name</th><th>Format</th><th># Teams</th></tr></thead>
            <tbody>
              {this.draftsTable()}
              <tr className='disabled'>
                <td className='bg-light text-dark' colSpan="4"
                    onClick={() => {this.setState({ addDraft: true })}}>
                  Create New Draft
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

DraftBoard.defaultProps = {
  drafts: []
}

DraftBoard.propTypes = {
  drafts: PropTypes.array
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('data');
  const data = JSON.parse(node.getAttribute('data'));
  ReactDOM.render(
    <DraftBoard drafts={data.drafts} user={data.user}/>,
    document.body.appendChild(document.createElement('div')),
  )
})