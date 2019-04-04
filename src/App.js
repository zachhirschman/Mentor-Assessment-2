import React, {Component} from "react"
import routes from "./routes"

export default class App extends Component{
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
      <div>
        {routes}
      </div>
    )
  }
}