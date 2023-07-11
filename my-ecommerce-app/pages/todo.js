import { useEffect, useState } from 'react'
import axios from 'axios';

function Todo(){
    const [work,setWork] = useState("");
    const [todos, setTodos] = useState([]); 
    const [counts, setCounts] = useState({
        total: 0,
        completed: 0,
        unCompleted: 0
    })

    async function getAll(){
        const result = await axios.get("/api/todos/get");
        console.log(result);
        setTodos(result.data);        
    }   

    useEffect(()=>{
        getAll();
    },[]);
    
    useEffect(()=> {
        setCount();
    }, [todos]);

    async function submit(){
        const data = {
            work: work,
        }
        const result = await axios.post("/api/todos/add", data);

        setWork("");
        getAll();
    }

    function handleChange(e){
        setWork(e.target.value);
        if(!e.target.validity.valid){
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        }else{        
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        }
    }

    async function remove(todo){
        let result = confirm(`${todo.work} kaydını silmek istiyor musunuz?`);
        if(result){
            await axios.post("/api/todos/remove",todo);
            getAll();
        }      
    }

    async function changeStatus(todo){
        let result = confirm(`${todo.work} kaydının durumunu değiştirmek istiyor musunuz?`);
        if(result){
            await axios.post("/api/todos/changeStatus",todo);
            getAll();
        }
    }

    function setCount(){        
        const completed = todos.filter(p=> p.isCompleted === true).length;
        const uncompleted = todos.filter(p=> p.isCompleted === false).length;
        setCounts({
            total: todos.length,
            completed: completed,
            unCompleted: uncompleted
        });

    }

    return(
        <div className='container d-flex justify-content-center'>
            <div className='col-12 col-md-8 col-lg-8'>
                <form onSubmit={submit}>
                    <div className='form-group'>
                        <label htmlFor="work">Yapılacak</label>
                        <input 
                            type="text" 
                            autoComplete='off'
                            id="work"
                            required
                            minLength="3"
                            className='form-control'
                            value={work}
                            onChange={handleChange} />
                        <div className='invalid-feedback'>
                            En az 3 karakter yazmalısınız!
                        </div>
                    </div>
                    <div className='form-group mt-1'>
                        <button className='btn btn-primary w-100'>Kaydet</button>
                    </div>
                </form>
                <hr />
                <div className='row'>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className='card alert alert-info text-center'>
                            <div className='card-header'>
                                <p className='bold'>Toplam</p>
                                <h3>{counts.total}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className='card alert alert-success text-center'>
                            <div className='card-header'>
                                <p className='bold'>Tamamlanan </p>
                                <h3>{counts.completed}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-12 col-lg-4'>
                        <div className='card alert alert-danger text-center'>
                            <div className='card-header'>
                                <p className='bold'>Kalan</p>
                                <h3>{counts.unCompleted}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Yapılacak</th>                            
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((val,index) => {
                             const lineStyle = {
                                textDecoration: val.isCompleted ? 'line-through': "", textDecorationColor: "red", 
                                color: val.isCompleted ? "red" : "black"
                            }
                            
                            function setButton(){
                                if(val.isCompleted){
                                    return <button 
                                            className='btn btn-outline-info btn-sm' 
                                            title='İptal Et'
                                            onClick={()=> changeStatus(val)}>
                                            <i className='fa-solid fa-x'></i>
                                        </button>
                                }else{
                                    return  <button 
                                            className='btn btn-outline-success btn-sm' 
                                            title='Tamamla'
                                            onClick={()=> changeStatus(val)}>
                                            <i className='fa-solid fa-check'></i>
                                        </button>  
                                }
                            }

                            return(
                                <tr key={index}>
                                    <td style={lineStyle}>{index + 1}</td>
                                    <td style={lineStyle}>
                                        {val.work}
                                    </td>
                                    <td>
                                        {setButton()}
                                        <button 
                                            className='btn btn-outline-danger btn-sm mx-1' 
                                            title='Sil'
                                            onClick={()=> remove(val)}>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Todo;