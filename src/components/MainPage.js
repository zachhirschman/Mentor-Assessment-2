import React, { Component } from 'react';
import '../App.css';
import {connect} from "react-redux"
import { getTasks, addTask, deleteTask } from "../redux/tasks"
import Task from "./Tasks"


class App extends Component {
  constructor(){
    super()
    this.state = {
      taskName:"",
      taskDescription:"",
      id:0,
      error:false
    }
  }
  componentDidMount = () =>{
    this.props.getTasks()
  }
  addTask = (e) =>{
    if(this.state.taskName === ""){
      this.setState({
        error:true,
        taskName:"",
        taskDescription:""
      })
    }
    else{
      let task = {
        id:this.state.id+1,
        title:this.state.taskName,
        description:this.state.taskDescription,
        completed:false
      }

      console.log("Original props: ", this.props.tasks)
      console.log("Adding: ", task)
      this.props.addTask(task)

      this.setState({
        id:this.state.id+1,
        taskName:"",
        taskDescription:"",
        error:false
      })

    }
      
  }
  
  completeTask = (id) =>{
    let tasksCopy = this.props.tasks.slice()
    for(let i = 0; i < tasksCopy.length; i++){
      if(tasksCopy[i].id == id){
        tasksCopy[i].completed = true
      }
    }
    this.props.completeTask(tasksCopy)
  }
  deleteTask = (id) =>{
    console.log(id)
      this.props.deleteTask(id)
  }
  render() {
    // console.log(this.props.tasks)
    let mappedTasks = this.props.tasks.map(task =>{
      return(
        <Task task_id = {task.id}
              task_title = {task.title}
              task_description = {task.description}
              completed = {task.completed}
              completeTaskFn = {this.completeTask}
              deleteTaskFn = {this.deleteTask}/>
      )
    })
    return (
      <div className="App">
        <div className = "main_form">
          <h1>To-do:</h1>
            {this.state.error? <p style = {{"color":"red"}}>Must enter a task name!!!</p>:null}
                <label>Task Name:</label>
                  <input value= {this.state.taskName} onChange = {(e) =>{this.setState({taskName:e.target.value})}} placeholder = "Enter a task name..."></input>

                <label>Task Description:</label>
                  <input value= {this.state.taskDescription} onChange = {(e) =>{this.setState({taskDescription:e.target.value})}} placeholder = "Enter a description of the task..."></input>
                  <button onClick = {(e) => this.addTask(e)}>Add Task</button>
        </div>
       
        <div>
          {mappedTasks}
        </div>
      </div>
    );
  }
}
let MapStateToProps = (state) =>{
  return{
    tasks:state.tasks
  }
}

export default connect(MapStateToProps,{ getTasks, addTask, deleteTask })(App)