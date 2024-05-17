import Home from './components/Home'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from "./components/Form"
import UpdateForm from './components/UpdateForm'
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {

  return (
    <>     
    <BrowserRouter> 
      
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/update/:id" element={<UpdateForm/>}/>
      <Route path="/Sign-up" element={<Signup/>}/>
      <Route path="/Login" element={<Login/>}/>

    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
