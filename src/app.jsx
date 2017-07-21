import React, { Component } from "react"
import ReactDOM from "react-dom"
import DownloadButton from "./components/DownloadButton"
import "./styles.css"

class App extends Component {
  render() {
    return (
      <div>
        <h1>Back in business boys</h1>
        <DownloadButton />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
