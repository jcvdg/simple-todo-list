import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
// import { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField 
              value={todoValue}
              onChange={e => setTodoValue(e.target.value)}
              type="text"
              id="outlined-basic" 
              label="Task name" 
              variant="outlined"
              fullWidth label="fullWidth" id="fullWidth" 
              // size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <Button 
              onClick={handleAddTodo}
              variant="contained"
              size="large"
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={8}>
            <div>{todos.filter(todo => !todo.complete).length} tasks remaining</div>
          </Grid>
          <Grid item xs={4}>
            <Button 
              onClick={handleClearTodos}
              variant="contained"
              size="large"
            >
              Clear completed
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App;