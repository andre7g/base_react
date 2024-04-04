import { MouseEvent } from 'react';
import { useCustomSelector } from '../../hooks/redux';
import { Link, NavLink } from 'react-router-dom';
import { useLoginActions } from '../../hooks/login/useLoginActions';

export const Navbar = () => {
    const auth = useCustomSelector((state) => state.auth);
    const { logoutAction } = useLoginActions();

    const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
          const res = await logoutAction();
          console.log(res)
        //   if(res?.status){
        //     setRedirectToHome(true);
        //   }
        } catch (error) {
          console.log(error) // Manejar el error aquí
        }
      };
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Home
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={({ isActive }) => `nav-item nav-link ${ isActive ? 'active':''}`} 
                        to="/productos"
                    >
                        Productos
                    </NavLink>

                    <NavLink 
                        className={({ isActive }) => `nav-item nav-link ${ isActive ? 'active':''}`} 
                        to="/ingredientes"
                    >
                        Ingredientes
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-primary'>
                        { auth.name }
                    </span>
                    <button className='nav-item nav-link btn' onClick={handleLogout}>
                    Logout
                    </button>


                </ul>
            </div>
        </nav>
    )
}