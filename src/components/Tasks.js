import React, {Component} from "react"
import {Link} from "react-router-dom"
import "./task.css"

export default function task(props){
    return(
        <div className = "taskContainer">
            <h1 className = {props.completed? "completedTask":"notCompletedTask"}>{props.task_title}</h1>
            <p>{props.task_description}</p>
            <Link to = {`/details/${props.task_id}`}><button>Details</button></Link>
        </div>
    )
}