import React from "react"
import { Link } from "react-router-dom"

class Home extends React.Component {
  constructor() {
    super()
    this.state = { state: 0 }
  }
  render() {
    return (
      <div>
        <h1>Homepage!</h1>
        <Link to={"/about"}>
          About
        </Link>
      </div>
    )
  }
}

export default Home
