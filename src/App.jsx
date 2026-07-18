import React from "react";
import { useState, useEffect } from "react";
import { supabase } from './utils/supabase'
import './App.css'


function App() {
  const [task, setTask] = useState('')
  const [todo, setTodo] = useState([])

  async function remove(id) {
    const { data, error } = await supabase
      .from('_todo')
      .delete()
      .eq('id', id);
    getData();

  }


  async function getData() {
    const { data, error } = await supabase
      .from("_todo")
      .select("*");
    console.log(data)
    setTodo(data)
    return data
  }

  async function Submit() {
    if (task.trim() === "") {
      alert('please write some todos')

    } else {
      const { data, error } = await supabase
        .from('_todo')
        .insert([
          { task }
        ]);
      getData()
      console.log(task)
      setTask("")
    }
  }
  useEffect(() => {
    getData()
  }, [])



  return (
    <div id="todo-container">
      <div id="todo-form">
        <input id="todo-input" placeholder="Enter your name" value={task} onChange={(e) => setTask(e.target.value)} />
        <button id="add-btn" onClick={Submit}>Add</button>
      </div>
      <div id="todo-list">
        {todo.map((e) => (

          <div className="todo-item" key={e.id}>
            <span className="todo-text">{e.task}</span>

            <div className="todo-actions">
              <button className="delete-btn" onClick={() => remove(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>)
}

export default App
