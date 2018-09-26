import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'react-bootstrap'

export class DraftHeader extends React.Component {
  render() {
    return(
      <Row className="align-items-center">
        <Col md={1}>
          <Button onClick={this.props.back} bsStyle="danger">Back</Button>
        </Col>
        <Col md={3}>
          <h2 className='text-primary'>{this.props.draft.name}</h2>
        </Col>
        <Col md={1} mdOffset={6}>
          <h6 className='text-secondary'>Round: {this.props.nextPick.round}</h6>
        </Col>
        <Col md={1}>
          <h6 className='text-secondary'>Pick: {this.props.nextPick.pick}</h6>
        </Col>
      </Row>
    )
  }
}