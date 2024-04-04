import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import {HomeRouter} from './Catalogos/HomeRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {
  return (
    <>
        
        <Routes>
            {/* <Route path='/' element={<Navigate to={"/home"}/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='consulta' element={<Consulta/>}/>
            <Route path='ingredientes' element={<Ingredientes/>}/> */}

            <Route path='login' element={
              <PublicRoute>
                <Login/>
              </PublicRoute>
            }/>

            <Route path='/*' element={
                <PrivateRoute>
                    <HomeRouter/>
                </PrivateRoute>
            }/>
        </Routes>
    </>
  )
}
