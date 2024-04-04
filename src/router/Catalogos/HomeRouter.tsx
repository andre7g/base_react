import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import { Navbar } from '../../components'
import Ingredientes from '../../pages/Ingredientes'
import Productos from '../../pages/Productos'

export const HomeRouter = () => {
  return (
    <>
        <Navbar/>
        <div className='container'>
          <Routes>
              <Route path='/' element={<Navigate to={"/home"}/>}/>
              <Route path='home' element={<Home/>}/>
              <Route path='ingredientes' element={<Ingredientes/>}/>
              <Route path='productos' element={<Productos/>}/>
          </Routes>
        </div>
    </>
  )
}
