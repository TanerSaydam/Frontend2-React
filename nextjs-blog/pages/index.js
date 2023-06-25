import { useState } from "react"
import List from "./list";
import Add from "./add";

export default function Index() {
  const [todo,setTodo] = useState("");
  const [list, setList] = useState([]);
  
  function save(){
    setList(prev=> [...prev, todo]);
    setTodo("");
  }

  function remove(index){
    let newList = list.filter((val,i)=> i !== index);

    setList(newList);
  }

  function returnChildValue(val){
    setTodo(val);
  }
  //State Management
  return (
   <>
    <Add todo={todo} save={save} setTodo={setTodo}/>
    <hr/>
    <List taner={list} serap="merhaba" remove={remove} returnChildValue={returnChildValue}/>
   </>
  )
}
