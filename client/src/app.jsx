import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Observable} from 'rxjs'

const playSound = (sound) => {
  Observable.ajax({url: `/${sound}`, method: 'POST'})
    .catch(error => console.log(error))
    .subscribe()
}

const App = () =>
  <div>
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--3-col">
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          onClick={() => playSound('sale')}>sale</button>
      </div>
      <div className="mdl-cell mdl-cell--3-col">
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          onClick={() => playSound('lead')}>lead</button>
      </div>
      <div className="mdl-cell mdl-cell--3-col">
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          onClick={() => playSound('upsell')}>upsell</button>
      </div>
      <div className="mdl-cell mdl-cell--3-col">
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          onClick={() => playSound('downgrade')}>downgrade</button>
      </div>
    </div>
  </div>


ReactDOM.render(<App/>, document.getElementById('app'));
