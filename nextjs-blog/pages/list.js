import React from 'react'

export default function List(props) { //desctruction
  return (
    <ul>
        <h1>{props.serap}</h1>
        <button onClick={()=> props.returnChildValue("Taner Saydam")}>Geri Değer Dönder</button>
        {props.taner.map((val,index)=> <li key={index}>{val} <button onClick={()=> props.remove(index)}>Sil</button></li>)}       
    </ul>
  )
}
