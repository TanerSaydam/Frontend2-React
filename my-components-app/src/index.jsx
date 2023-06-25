import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

class ClassComponent extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      car: "",
      name: "Taner Saydam"
    }
  }

  render(){
    return(
      <>
      <h1>Merhaba! {this.state.name}</h1>
      <h1>Merhaba! {this.props.car}</h1>
      </>
    )
  }
}

function FunctionComponent(props){
  const [name, setName] = useState("");
  const [car, setCar] = useState("");

  return(
    <>
    <h1>Merhaba! {name}</h1>
    <h1>Merhaba! {props.lastName}</h1>
    <ClassComponent car={car}/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <h1>Merhaba</h1>
);

