import React from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function Todo({ todo, toggleTodo, labelId }) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <ListItem key={todo.id} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            edge="end"
            onChange={handleTodoClick}
            checked={todo.complete}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText 
          id={labelId} 
          primary={todo.name} 
          // onClick={() => console.log(`clicked ${todo.name}`)}
        />
      </ListItemButton>
    </ListItem>
  )
}