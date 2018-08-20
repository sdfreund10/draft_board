import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { NewDraftForm } from './newDraftForm'
import { UserLogin } from './userLogin'
import { Draft } from './draft'
import { postData } from './fetchUtils'

class DraftBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drafts: props.drafts, user: props.user }
  }

  addDraft(newDraft) {
    this.postDraft(newDraft).then(
      (response) => response.json()
    ).then(
      (responseJSON) => {
        let drafts = this.state.drafts;
        drafts.push(responseJSON.draft);
        this.setState({ drafts: drafts, addDraft: false })
      }
    );
  }

  postDraft(newDraft) {
    let draftData = {
      name: newDraft.name,
      format: newDraft.format,
      user_id: this.state.user.id,
      teams_attributes: newDraft.teams
    };
    return(
      postData('/drafts', { draft: draftData })
    )
  }

  setCurrentDraft(event, draft) {
    this.setState({ currentDraft: draft });
  }

  setUser(responseBody) {
    this.setState( { user: responseBody.user, drafts: responseBody.drafts });
  }

  removeDraft(event, draft) {
    debugger;
    this.state.drafts.find(el => el.id === draft.id)
  }

  draftsTable() {
    return(
      this.state.drafts.map((draft, index) =>
        <tr key={index}>
          <td onClick={(e) => this.setCurrentDraft(e, draft)}>{draft.name}</td>
          <td onClick={(e) => this.setCurrentDraft(e, draft)}>{draft.format}</td>
          <td onClick={(e) => this.setCurrentDraft(e, draft)}>{draft.teams.length}</td>
          <td>
            <button type='button' className='btn-sm bg-danger'
                    onClick={(e) => { this.removeDraft(e, draft) }}>
              X
            </button>
          </td>
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
      return(
        <div className='main-content'>
          <Draft draft={this.state.currentDraft} user={this.state.user}
                 back={() => this.setState({currentDraft: null })}/>
        </div>
      )
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