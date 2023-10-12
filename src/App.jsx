
import { Outlet } from 'react-router-dom'
import './App.css'
import MouseFlow from './Component/MouseFlow/MouseFlow'


function App() {

  return (
    <>
    <MouseFlow></MouseFlow>
   <Outlet></Outlet>
    </>
  )
}

export default App
