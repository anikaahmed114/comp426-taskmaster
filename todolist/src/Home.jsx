import React from 'react'
import { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill} from "react-icons/bs";
import WeatherWidget from '../WeatherWidget';
import RandomQuote from '../RandomQuote';
import MyCalendar from '../Calendar';
import './App.css'

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, done: !todo.done };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => window.location.reload())
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <div className='banner'>
                taskmaster
            </div>
            <div className='image'></div>
            <div className="weather">
                    <WeatherWidget />
                </div>
            <div className="taskContainer">
                <h2>todos.</h2>
                <Create />
                {todos.length === 0 ? (
                    <div><h3>no tasks yet</h3></div>
                ) : (
                    todos.map(todo => (
                        <div className="task" key={todo._id}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ? <BsFillCheckCircleFill className="icon" /> : <BsCircleFill className="icon" />}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    ))
                )}
            </div>
                <div className="quotes">
                    <h1>quotes</h1>
                    <RandomQuote />
                </div>
                <div className='calendar'>
                    <MyCalendar />
                </div>
                <div className='oldwell'></div>
            </div>
    );
}

export default Home;