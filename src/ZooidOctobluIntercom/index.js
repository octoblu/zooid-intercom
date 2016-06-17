import React, { Component, PropTypes } from 'react'

import Intercom from 'react-intercom'
import { getUser } from '../services/octoblu-service'

const propTypes = {
  uuid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  apiBaseUrl: PropTypes.string,
  appId: PropTypes.string.isRequired,
}

const defaultProps = {
  apiBaseUrl: 'https://api.octoblu.com',
}

class ZooidOctobluIntercom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    const { uuid, token, apiBaseUrl } = this.props
    getUser({ uuid, token, apiBaseUrl }, (error, user) => {
      if (error) {
        console.error(error)
        return
      }
      this.setState({ user })
    })
  }

  render() {
    const { user } = this.state
    if (!user) {
      return null
    }
    const { appId } = this.props
    return <Intercom appID={appId} {...user} />
  }
}

ZooidOctobluIntercom.propTypes = propTypes;
ZooidOctobluIntercom.defaultProps = defaultProps;

export default ZooidOctobluIntercom;
