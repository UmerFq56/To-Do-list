import { useEffect, useState } from 'react';
import './style.css'
import { TodoForm } from './TodoForm';
import { TdList } from './TdList';
function App() {
  
  const [todos, setTodos] = useState(() => {
    var localValue = localStorage.getItem('ITEM')
    if (localValue === null) {
      return
    }
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem('ITEM',JSON.stringify(todos))
  },[todos])



 

  function addTodo(title) {
    setTodos((currentTodos) => {
          return [
            ...currentTodos,{id: crypto.randomUUID(), title, completed: false}
          ]
        })
  }



  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }

        return todo
      })
    })
  }


  function deleteTodo(id) {
    setTodos(currentTodo => {
      return currentTodo.filter(todo => todo.id != id)
    })

  }




  return ( 
    <>
      <TodoForm onSubmit={addTodo}/>
      <h1 className='header'> To-Do List </h1>
      <TdList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
   );
}

export default App;