import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export class DraftHeader extends React.Component {
  render() {
    return(
      <div className='row align-items-center'>
        <div className='col-sm-1'>
          <button className='btn btn-outline-danger' onClick={this.props.back}>Back</button>
        </div>
        <div className='col-sm-3 text-primary'><h2>{this.props.draft.name}</h2></div>
        <div className='col-sm-1 offset-sm-6 text-secondary'><h6>Round: {this.props.nextPick.round}</h6></div>
        <div className='col-sm-1 text-secondary'><h6>Pick: {this.props.nextPick.pick}</h6></div>
      </div>
    )
  }
}