import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  // initial load of todos from local storage
  useEffect( () => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);

  }, [])

  // add new todos to local storage
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    // in React, we never directly modify a state variable, but instead copy it, modify ,and use the copy to set it
    const newTodos = [...todos];
    const todo = newTodos.find( todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoValue;

    if(name==='')return;
    console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
    })
    setTodoValue('');
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>To Do </h1>
      <div className='taskField'>
            <TextField 
              value={todoValue}
              onChange={e => setTodoValue(e.target.value)}
              type="text"
              // id="outlined-basic" 
              label="Task ..." 
              variant="outlined"
              fullWidth  
              id="fullWidth" 
              // size="small"
            />
            <Button 
              onClick={handleAddTodo}
              variant="contained"
            >
              Add
            </Button>

      </div>
      <div className='listInfo'>
            <div>{todos.filter(todo => !todo.complete).length} tasks remaining</div>
            <Button 
              onClick={handleClearTodos}
              variant="outlined"
              size="small"
              color="secondary"
            >
              Clear completed
            </Button>
        </div>
        <div className='list' style={{display: todos.length===0 ? 'none' : null}} >
              <TodoList todos={todos} toggleTodo={toggleTodo} />

        </div>
            
    </>
  )
}

export default App;