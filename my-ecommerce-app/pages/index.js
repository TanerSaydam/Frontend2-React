import axios from "axios";
import { useEffect, useState } from "react"

function Home() {
  const [count,setCount] = useState(0);

  async function getAll(){
    await axios.get("");
  }

  useEffect(()=> {    
    getAll();
  }, [])

  console.log("Sayfa yeniliyor!")

  return (
    <div className="container">
      <h1>{count}</h1>  
      <h1>{newCount}</h1>  
      <button onClick={()=> setCount(c => c + 1)}>+</button>
    </div>
  )
}

export default Home;