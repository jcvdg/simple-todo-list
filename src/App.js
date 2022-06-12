import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
// import { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

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
    const name = todoNameRef.current.value;

    if(name==='')return;
    console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TextField 
        ref={todoNameRef} 
        type="text"
        id="outlined-basic" 
        label="Task name" 
        variant="outlined"
        // fullWidth label="fullWidth" id="fullWidth" 
        // size="small"
      />
      {/* <input  /> */}
      {/* <button onClick={handleAddTodo}>Add</button> */}
      <Button 
        onClick={handleAddTodo}
        variant="contained"
        size="large"
      >
        Add
      </Button>

      
      <div>{todos.filter(todo => !todo.complete).length} tasks remaining</div>
      {/* <button onClick={handleClearTodos}>Clear completed tasks</button> */}
      <Button 
        onClick={handleClearTodos}
        variant="contained"
        size="large"
      >
        Clear completed
      </Button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />

    </>
  )
}

export default App;