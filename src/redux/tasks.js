import axios from "axios"

const apiURL = `https://practiceapi.devmountain.com/api/tasks/`;

let initialState = {
    tasks:[]
}
const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = 'DELETE_TASK'
const EDIT_TASK_TITLE = "EDIT_TASK_TITLE"
const EDIT_TASK_DESCRIPTION = "EDIT_TASK_DESCRIPTION"
const COMPLETE_TASK = "COMPLETE_TASK"

export default function tasks( state = initialState, action){
    switch(action.type){
        case EDIT_TASK_TITLE + "_FULFILLED":
            return {tasks:action.payload}
        case GET_TASKS + "_FULFILLED":
            return {tasks: action.payload}
        case ADD_TASK + "_FULFILLED":
            return {tasks:action.payload}
        case DELETE_TASK + "_FULFILLED":
            return {tasks:action.payload}
        case EDIT_TASK_DESCRIPTION + "_FULFILLED":
            return {tasks:action.payload}
        case COMPLETE_TASK + "_FULFILLED":
            return {tasks:action.payload}
        default: return state;
    }
}

export function getTasks() {
    const promise = axios.get( apiURL ).then( response => response.data );
    return {
      type: GET_TASKS,
      payload: promise
    }
  }
  
  export function addTask( title ) {
    const promise = axios.post( apiURL, {id:title.id,title:title.title,description:title.description,completed:title.completed} ).then( response => response.data );
    return {
      type: ADD_TASK,
      payload: promise
    }
  }
  export function deleteTask( id ){
      console.log(id)
    const promise = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then( response => response.data );
    return {
      type: DELETE_TASK,
      payload: promise
    }
  }
  export function editTitle(id,change){
    console.log("Reducer:", id, change)
    const promise = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {title:change}).then( response => response.data );
    return {
      type:EDIT_TASK_TITLE,
      payload: promise
    }
  }
  export function editDescription(id,change){
    console.log("Reducer:", id, change)
    const promise = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {description:change}).then( response => response.data );
    return {
      type:EDIT_TASK_DESCRIPTION,
      payload: promise
    }
  }
  export function completeTask(id){
    const promise = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then( response => response.data );
    return {
      type:COMPLETE_TASK,
      payload: promise
    }
  }