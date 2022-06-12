import React from 'react';
import Todo from './Todo';
import List from '@mui/material/List';


export default function TodoList({ todos, toggleTodo }) {
  return (
    <List sx={{ width: '100%', maxWidth: 550, bgcolor: 'background.paper' }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo}`;

        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} labelId={labelId} />

      })}
    </List>
  )
}