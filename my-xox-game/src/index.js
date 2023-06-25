import ReactDOM from 'react-dom/client';
import './style.css';
import { useRef, useState } from 'react';

const App = () =>{
  const divStyle = {
    textAlign: "center"
  }

  const [game,setGame] = useState(
    [
      "","","","","","","","",""
    ]
  ); 

  const [mark, setMark] = useState("X");
  const divRef = useRef();
  const [gameOver, setGameOver] = useState(false);  

  function setMarkToGame(index){
    if(game[index] !== "") return;
    if(gameOver) return;
    //game[index] = "X"

    let newGame = game.map((val,i)=> {
      if(i === index) return mark
      else return val
    });

    setGame(newGame);

    mark === "X" ? setMark("O") : setMark("X") // yöntem adı? ternary operatörü // single if line

    // if(mark === "X"){

    // }
    // mark === "X" ?? setMark("O") //logical operatörü

    isGameOver(newGame);
    
  }

  const newGame = () => {
    document.location.reload();
  }

      //   let x = 0; ///number
      //   let y = "0" //string
      // if(x == y) => true
      // if(x === y) => false

  function isGameOver(newGame){
    let isGameOver = false;
//document olarak yazdıklarımı userefe çevirin ve oyun bitti metodunu kısaltın
    if(newGame[0] !== "" && newGame[0] == newGame[1] && newGame[1] === newGame[2]){     
      isGameOver = true;
      document.getElementById("div-0").style.backgroundColor = "green";
      document.getElementById("div-0").style.color = "white";
      document.getElementById("div-1").style.backgroundColor = "green";
      document.getElementById("div-1").style.color = "white";
      document.getElementById("div-2").style.backgroundColor = "green";
      document.getElementById("div-2").style.color = "white";
    }else if(newGame[3] !== "" && newGame[3] == newGame[4] && newGame[4] === newGame[5]){
      isGameOver = true;
      document.getElementById("div-3").style.backgroundColor = "green";
      document.getElementById("div-3").style.color = "white";
      document.getElementById("div-4").style.backgroundColor = "green";
      document.getElementById("div-4").style.color = "white";
      document.getElementById("div-5").style.backgroundColor = "green";
      document.getElementById("div-5").style.color = "white";
    }else if(newGame[6] !== "" && newGame[6] == newGame[7] && newGame[7] === newGame[8]){
      isGameOver = true;
      document.getElementById("div-6").style.backgroundColor = "green";
      document.getElementById("div-6").style.color = "white";
      document.getElementById("div-7").style.backgroundColor = "green";
      document.getElementById("div-7").style.color = "white";
      document.getElementById("div-8").style.backgroundColor = "green";
      document.getElementById("div-8").style.color = "white";
    }else if(newGame[0] !== "" && newGame[0] == newGame[3] && newGame[3] === newGame[6]){
      isGameOver = true;
      document.getElementById("div-0").style.backgroundColor = "green";
      document.getElementById("div-0").style.color = "white";
      document.getElementById("div-3").style.backgroundColor = "green";
      document.getElementById("div-3").style.color = "white";
      document.getElementById("div-6").style.backgroundColor = "green";
      document.getElementById("div-6").style.color = "white";
    }else if(newGame[1] !== "" && newGame[1] == newGame[4] && newGame[4] === newGame[7]){
      isGameOver = true;
      document.getElementById("div-1").style.backgroundColor = "green";
      document.getElementById("div-1").style.color = "white";
      document.getElementById("div-4").style.backgroundColor = "green";
      document.getElementById("div-4").style.color = "white";
      document.getElementById("div-7").style.backgroundColor = "green";
      document.getElementById("div-7").style.color = "white";
    }else if(newGame[2] !== "" && newGame[2] == newGame[5] && newGame[5] === newGame[8]){
      isGameOver = true;
      document.getElementById("div-2").style.backgroundColor = "green";
      document.getElementById("div-2").style.color = "white";
      document.getElementById("div-5").style.backgroundColor = "green";
      document.getElementById("div-5").style.color = "white";
      document.getElementById("div-8").style.backgroundColor = "green";
      document.getElementById("div-8").style.color = "white";
    }else if(newGame[0] !== "" && newGame[0] == newGame[4] && newGame[4] === newGame[8]){
      isGameOver = true;
      document.getElementById("div-0").style.backgroundColor = "green";
      document.getElementById("div-0").style.color = "white";
      document.getElementById("div-4").style.backgroundColor = "green";
      document.getElementById("div-4").style.color = "white";
      document.getElementById("div-8").style.backgroundColor = "green";
      document.getElementById("div-8").style.color = "white";
    }else if(newGame[2] !== "" && newGame[2] == newGame[4] && newGame[4] === newGame[6]){
      isGameOver = true;
      document.getElementById("div-2").style.backgroundColor = "green";
      document.getElementById("div-2").style.color = "white";
      document.getElementById("div-4").style.backgroundColor = "green";
      document.getElementById("div-4").style.color = "white";
      document.getElementById("div-6").style.backgroundColor = "green";
      document.getElementById("div-6").style.color = "white";
    }

    if(isGameOver) {
      divRef.current.removeAttribute("hidden");
      divRef.current.innerText = `Oyunu ${mark} kazandı!`
    }

    setGameOver(isGameOver);
  }

  return(
    <>
      <h1 className='alert alert-info' style={divStyle}>XOX Oyunu</h1>
      <h2 ref={divRef} className='alert alert-success' hidden style={divStyle}>Oyunu X Kazandı</h2>

      <div className='container'>
        <div className='row'>
          {/* Oyun Alanı */}  
          <div className='col-9'>
            <div className='row game-row'>
              {game.map((val,index) => 
                                      <div 
                                      id={"div-" + index}                                      
                                        onClick={()=> setMarkToGame(index)}
                                        key={index} className='col-4 game'> 
                                      {val} 
                                      </div>)}                                 
            </div>
          </div>
          {/* Oyun Alanı */}

          {/* Oyunun Ayarları */}
          <div className='col-3' style={{borderLeft: "1px solid", height: "70vh"}}>
            <h1 style={divStyle}>Sıradaki: {mark}</h1>
            <button className='btn btn-outline-danger w-100' onClick={newGame}>Yeni Oyun</button>
            <hr/>
            <div>
            <button className='btn btn-outline-primary btn-sm w-100 mt-1'>1. Hamle</button>                          
            </div>
          </div>
          {/* Oyunun Ayarları */}
        </div>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);