import { Route, Switch} from "react-router-dom"
import React, {Component} from "react"
import DetailedTask from './components/DetailedTask'
import MainPage from "./components/MainPage";

export default(
    <Switch>
        <Route exact path = "/" component = {MainPage}></Route>
        <Route path = "/details/:id" component = {DetailedTask}></Route>
    </Switch>
)