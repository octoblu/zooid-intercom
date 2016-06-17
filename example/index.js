import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ZooidOctobluIntercom from '../src/index';

class Example extends Component {
  render() {
    const { uuid, token } = {
      uuid: '0759a161-f8db-4393-a4e0-03b566591fd2',
      token: '43f280b54849f77eb94114f4682bc447204d1841',
    }
    return (
      <div>
        <h1>Example</h1>
        <ZooidOctobluIntercom appId="ux5bbkjz" uuid={uuid} token={token} />
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.querySelector('#root'));
