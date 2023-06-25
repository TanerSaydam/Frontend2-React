import ReactDOM from 'react-dom/client';
import {useState, useRef} from 'react';
import './style.css'

function App(){
  const [work,setWork] = useState("");
  const [todos,setTodos]=useState([]);
  const [updateIndex, setUpdateIndex] = useState(0); //hook

  const updateEl = useRef();
  const addEl = useRef();
  const cancelEl = useRef();
  const listEl = useRef();


  function addTodo(){    
    setTodos((p)=> [...p,work]);   
    setWork(""); 
  }

  function removeTodo(i){
    const newTodos = todos.filter(p=> p !== todos[i]);    
  
    setTodos(newTodos);
  }
  
  function get(i){
    setWork(todos[i]);
    setUpdateIndex(i);
    // document.getElementById("update").style.display = "block";
    // document.getElementById("add").style.display = "none";
    // document.getElementById("cancel").style.display = "block";
    // document.getElementById("list").style.display = "none";
    
     updateEl.current.style.display = "block";
     addEl.current.style.display = "none";
     cancelEl.current.style.display = "block";
     listEl.current.style.display = "none"
  }

  function cancel(){
    setWork("");
    setUpdateIndex(0);
    // document.getElementById("update").style.display = "none";
    // document.getElementById("add").style.display = "block";
    // document.getElementById("cancel").style.display = "none";
    // document.getElementById("list").style.display = "block";

    updateEl.current.style.display = "none";
    addEl.current.style.display = "block";
    cancelEl.current.style.display = "none";
    listEl.current.style.display = "block"
  }

  function update(){
    const newTodos = todos.map((val,index)=> {
      if(index === updateIndex) return work;
      else return val;
    });

    setTodos(newTodos);

    cancel();
  }
  
  return(
    <>
      <h1>Todo App</h1>
      Yapılacaklar
      <input type="text"
        value={work}          
        onChange={(e)=> setWork(e.target.value)}
       />
      <button id="add" ref={addEl} onClick={addTodo}>Ekle</button>
      <button id="update" ref={updateEl} style={{display:"none"}} onClick={update}>Güncelle</button>
      <button id="cancel" ref={cancelEl} style={{display:"none"}} onClick={cancel}>Vazgeç</button>
      <hr/>
      <ul id="list" ref={listEl}>
        {todos.map((val,index)=> {
          return(
            <li key={index}>{val}
              <button onClick={()=> get(index)}>Güncelle</button>
              <button onClick={()=> removeTodo(index)}>Sil</button>
            </li>     
          )
        })}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);
