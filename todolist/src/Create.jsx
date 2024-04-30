import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './App.css'

function Create(){
    const[task, setTask] = useState()
    const handleAdd = () => {
            axios.post('http://localhost:3001/add', {task: task})
            .then(result => location.reload())
            .catch(err => console.log(err))
        }
    return (
        <div className = 'create_form'>
            <input type = "text" placeholder = 'enter task' onChange={(e) => setTask(e.target.value)}/>
            <button type = "button" onClick={handleAdd}>add</button>
    </div>
    )
}

export default Create