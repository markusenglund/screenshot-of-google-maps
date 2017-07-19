import React, { Component } from "react"
import ReactDOM from "react-dom"

import "./styles.css"

// import Home from "./components/Home"

class App extends Component {
  render() {
    return (
      <div>
        <h1>Back in business boys</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
