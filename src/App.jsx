import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { apiConect } from './api/apiConect'
import Header from './Components/Header/Header'
import Card from './Components/Card/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardUpdate from './Components/CardUpdate/CardUpdate'

 function App() {

//  const dados = async function fetchData(){
//   const response = await apiConect.apiGetAll()
//   const data = await response.json()
//   return data
// }

// const fetchData = async()=>{
//   const data = await  apiConect.apiGetAll()
//   console.log(data);
//   return data
// }
// fetchData()
  
  return (
    <div className='appContainer'>
    <Header />
   
       
    <Card />
    <CardUpdate/>
    <ToastContainer />  
    </div>
  )
}

export default App
