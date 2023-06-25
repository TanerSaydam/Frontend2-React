import { useState} from 'react';

function Home(){
    const [car,setCar]= useState();
    console.log("Sayfa render ediliyor")
    let person = "";
    function handleChange(e){
        person = e.target.value
        setCar(e.target.value)
    }

    return(
        <>
        <h1>Home Component {car}</h1>
        {/* <input type="text" 
        onChange={(e)=> setCar(e.target.value)}
        value={car} /> */}
        <input type="text"
        onChange={handleChange} 
        value={car}/>
        </>
    )
}

export default Home;