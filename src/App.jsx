import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [todos,setTodos]=useState(()=>{
    const data1=JSON.parse(localStorage.getItem("todos"));
    return data1?data1:[]
  });
  const [input,setInput]=useState("");
  const [editId,setEditId]=useState(null);
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])
  const handleClick=()=>{
    if(input.trim()===""){return;}
    if(editId){
      setTodos(todos.map((todo)=>(editId===todo.id?{...todo,data:input}:todo)));
      setEditId(null);
    }
    else{
      setTodos([...todos,{"id":Date.now(),"data":input,"completed":false}]);
      
    }
    setInput("");
  }
  const handleEdit=(id)=>{
    setEditId(id);
    setInput(todos.filter((todo)=>(todo.id===id))[0].data);
  }
  const handleDelete=(id)=>{
    setTodos(todos.filter((todo)=>(todo.id!=id)))
  }
  
  return (
   <>
   <div className='w-100 h-100 cont d-flex justify-content-center align-items-center'>
   <div className="app-container flex-shrink-0 container-md mx-auto p-3 d-flex flex-column justify-content-center align-items-center " >
    <h3>Todo List</h3>
    <div className="m-2 input-container d-flex justify-content-between">
      <input type="text" className="mx-2 px-3" placeholder='Add Your Task' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
      <button className='btn btn-primary px-3' onClick={handleClick}>{editId?"Update":"Add"}</button>
    </div>
    <div className="w-100 todos-container">
      <ul className='w-100'>
        {todos.map((todo)=>( <li className=' p-2 w-100 my-1 d-flex align-items-center justify-content-between'key={todo.id} onDoubleClick={()=>{handleEdit(todo.id)}}>{todo.data}<span><button className='btn btn-danger mx-1' onClick={()=>(handleDelete(todo.id))}>Delete</button></span></li>))}
      </ul>
    </div>
    <div className="copy-right py-2">
      <p>Designed by <a href="https://www.linkedin.com/in/madhavan-p-b75b752b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Madhavan</a></p>
    </div>
   </div>
   </div>
   </>
  )
}

export default App
