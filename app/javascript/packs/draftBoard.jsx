import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { NewDraftForm } from './newDraftForm'
import { UserLogin } from './userLogin'
import { Draft } from './draft'
import { postData, deleteData } from './fetchUtils'
import { Col, Table, Button, Modal } from 'react-bootstrap'

class DraftBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: props.drafts, user: props.user, draftToDelete: null, modal: false
    }
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

  renderModal(draft) {
    this.setState({ draftToDelete: draft.id, modal: true })
  }

  closeModal() {
    this.setState({ draftToDelete: null, modal: false })
  }

  removeDraft() {
    const draftToDelete = this.state.draftToDelete;
    const url = `drafts/${draftToDelete}`
    deleteData(url).then(() =>{
      let drafts = this.state.drafts.filter(el => draftToDelete !== el.id);
      this.setState({ drafts: drafts, modal: false })
    })
  }

  draftsTable() {
    return(
      this.state.drafts.map((draft, index) =>
        <tr key={index}>
          <td onClick={(e) => this.setCurrentDraft(e, draft)}>{draft.name}</td>
          <td onClick={(e) => this.setCurrentDraft(e, draft)}>{draft.format}</td>
          <td onClick={(e) => this.setCurrentDraft(e, draft)}>{draft.teams.length}</td>
          <td>
            <Button bsStyle='danger' onClick={(e) => { this.renderModal(draft) }}>
              X
            </Button>
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
        <Col md={12}>
          <NewDraftForm addDraft={this.addDraft.bind(this)} user={this.state.user}
                        cancelable={this.state.addDraft}
                        back={() => this.setState({addDraft: false })}/>
        </Col>
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
        <Col md={12} className='text-center text-primary'>
          <Table hover>
            <thead><tr>
              <th className='text-center'>Draft Name</th>
              <th className='text-center'>Format</th>
              <th className='text-center'># Teams</th>
            </tr></thead>
            <tbody>
              {this.draftsTable()}
              <tr className='disabled'>
                <td className='bg-light text-dark' colSpan="4"
                    onClick={() => {this.setState({ addDraft: true })}}>
                  Create New Draft
                </td>
              </tr>
            </tbody>
          </Table>
          <Modal show={this.state.modal} onHide={this.closeModal.bind(this)} bsSize="small">
            <Modal.Header closeButton>
              Are you sure you want to delete this draft?
            </Modal.Header>
            <Modal.Footer>
              <Col sm={1}>
                <Button bsStyle='primary' onClick={this.closeModal.bind(this)}>No</Button>
              </Col>
              <Col sm={1} smOffset={9}>
                <Button bsStyle='danger' onClick={this.removeDraft.bind(this)}>Yes</Button>
              </Col>
            </Modal.Footer>
          </Modal>
        </Col>
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
