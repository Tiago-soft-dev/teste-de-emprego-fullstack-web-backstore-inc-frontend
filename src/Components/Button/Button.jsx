import React, { useEffect } from 'react';
import { apiConect } from '../../api/apiConect';
import './Button.css'




export default function Button(props){
   
    const handleClick = ()=>{
        alert('clicou')
    }
    
   
  



    return (
        <button type={props.type} value={props.value} onClick={props.onClic}>{props.nome}</button>
    )
}