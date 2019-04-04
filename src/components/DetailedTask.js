import React, {Component} from "react"
import { connect } from "react-redux";
import { getTasks, deleteTask, editTitle, editDescription, completeTask } from "../redux/tasks";
import {Link} from "react-router-dom"
import "./DetailedTask.css"

class DetailedTask extends Component{
    constructor(props){
        super(props)
        this.state = {
            task:[],
            editTitle:"",
            editDescription:"",
            editTitleForm:false,
            editDescriptionForm:false,
            error:false
        }
    }
    componentDidMount() {
        this.props.getTasks().then( () =>{
            setTimeout(() => {
                this.setState({
                    task:this.props.task.filter(task => task.id == this.props.match.params.id)[0]
                })
            }, 200);
        })
    }
    
    handleTitleChange = (e) =>{
        this.setState({
            editTitle:e.target.value
        })
    }
    handleDescriptionChange = (e) =>{
        this.setState({
            editDescription:e.target.value
        })
    }
    editTitle = () =>{
        if(this.state.editTitle === ""){
            this.setState({
                error:true
            })
        }
        else{
            console.log(this.state.editTitle)
            this.props.editTitle(this.state.task.id,this.state.editTitle)
        }
        this.setState({
            editTitleForm:false,
            editTitle:""
        })
        this.props.history.push('/');
    }
    editDescription = () =>{
        this.props.editDescription(this.state.task.id,this.state.editDescription)
        this.setState({
            editDescriptionForm:false,
            editDescription:""
        })
        this.props.history.push('/');
    }
    deleteTask = (id) =>{
        this.props.deleteTask(id)
        this.props.history.push('/');
        
    }
    completeTask = () =>{
        this.props.completeTask(this.state.task.id)
        this.props.history.push('/');
    }

    render(){
        console.log("State : ", this.state.task)
        return(
            <div className = "detailed_task">
            <Link to = "/">
                <button>Back to main</button>
            </Link>
            
                <div>
                    {this.state.error? <p style = {{"color":"red"}}>Must enter a title!!!</p>: null}
                    <h1>{ this.state.editTitleForm? <div><input value = {this.state.editTitle} onChange = {(e) =>{this.handleTitleChange(e)}} placeholder = "Edit title of task..."></input><button onClick = {this.editTitle}>Submit</button></div>:this.state.task.title}</h1>
                    <h1>{ this.state.editDescriptionForm? <div><input value = {this.state.editDescription} onChange = {(e) =>{ this.setState( { editDescription: e.target.value})}}></input><button onClick = {this.editDescription}>Submit</button></div>:this.state.task.description}</h1>
                </div>
                <button onClick = {this.completeTask} type="button" disabled={this.state.task.completed} className = {this.state.task.completed? "completed":"notCompleted"}>Complete task</button>
                <button onClick = {() =>{this.deleteTask(this.state.task.id)}}>Delete task</button>
                <button onClick = { (e) => { this.setState( { editTitleForm:!this.state.editTitleForm})}}>{this.state.editTitleForm? "Cancel" : "Edit Task Name"}</button>
                <button onClick = {(e) => { this.setState( { editDescriptionForm:!this.state.editDescriptionForm})}}>{this.state.editDescriptionForm? "Cancel":"Edit Description"}</button>

            </div>
        )
    }
}
function mapStateToProps( state  ) {
    return {
      task:state.tasks
    }
  }
export default connect(mapStateToProps, {getTasks, deleteTask, editTitle, editDescription, completeTask})(DetailedTask)