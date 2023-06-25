import React from 'react'

export default function Add({todo, save,setTodo}) {
  return (
    <>
        <input value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        <button onClick={save}>Kaydet</button>
    </>
  )
}
