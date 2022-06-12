import React from 'react';

export default function Todo({ todo, toggleTodo }) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> 
    </div>

    // <ListItem
    // key={value}
    // secondaryAction={
    //   <Checkbox
    //     edge="end"
    //     onChange={handleToggle(value)}
    //     checked={checked.indexOf(value) !== -1}
    //     inputProps={{ 'aria-labelledby': labelId }}
    //   />
    // }
    // disablePadding
    // >
    // <ListItemButton>
    //   <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
    // </ListItemButton>
    // </ListItem>
  )
}