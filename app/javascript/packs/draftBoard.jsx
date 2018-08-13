import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { NewDraftForm } from './newDraftForm'

class DraftBoard extends React.Component {
  render() {
    if(this.props.drafts.length == 0 ) {
      return(
        <div className='col-md-12'>
          <NewDraftForm />
        </div>
      );
    } else {
      return(
        <div className='col-md-12 text-center text-primary'>
          <h1>You have some drafts!</h1>
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
    <DraftBoard drafts={data}/>,
    document.body.appendChild(document.createElement('div')),
  )
})