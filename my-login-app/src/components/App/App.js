import {useState} from 'react';

export default function App(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  
    const login = () => {
      // const email = document.getElementById("email").value;
      // const password = document.getElementById("password").value;
  
      let data = {
        email: email,
        password: password
      };
  
      console.log(data);
    }  

    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
        if(!e.target.validity.valid){
          e.target.classList.add("is-invalid");
          e.target.classList.remove("is-valid");
        }else{
          e.target.classList.add("is-valid");
          e.target.classList.remove("is-invalid");
        }
      }
    
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
        if(!e.target.validity.valid){
          e.target.classList.add("is-invalid");
          e.target.classList.remove("is-valid");
        }else{
          e.target.classList.add("is-valid");
          e.target.classList.remove("is-invalid");
        }
      }
  
    return(
      <div className='container d-flex justify-content-center' style={{marginTop:"10%"}}>
        <div className='card col-6'>
          <div className='card-header'>
          <h1>Login Page</h1>
          </div>
  
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input 
                type="email" 
                id="email" 
                required 
                email 
                autoComplete='off'
                className='form-control' 
                value={email} 
                onChange={handleEmailChange} />
              <div className='invalid-feedback'>
                Geçerli bir email adresi girin!
              </div>
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='password'>Password</label>
              <input 
                type="password" 
                id="password" 
                required 
                autoComplete='off'
                minLength="3" 
                className='form-control' 
                value={password} 
                onChange={handlePasswordChange} />
              <div className='invalid-feedback'>
                En az 3 karakter yazmalısınız!
              </div>
            </div>
            <div className='form-group mt-2'>
              <button disabled="disabled" onClick={login} className='btn btn-primary w-100'>Login</button>
            </div>
          </div>
          
        </div>
      </div>
    )
  }