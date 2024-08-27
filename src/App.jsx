import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { apiConect } from './api/apiConect'

 function App() {

//  const dados = async function fetchData(){
//   const response = await apiConect.apiGetAll()
//   const data = await response.json()
//   return data
// }

const fetchData = async()=>{
  const data = await  apiConect.apiGetAll()
  console.log(data);
  return data
}
fetchData()
  
  return (
    <>
      <h1></h1>
    </>
  )
}

export default App
