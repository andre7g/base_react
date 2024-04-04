import { useCustomSelector } from '../../hooks/redux';
import { Link, NavLink } from 'react-router-dom';


export const Navbar = () => {
    const auth = useCustomSelector((state) => state.auth);
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
                        to="/ingredientes"
                    >
                        Productos
                    </NavLink>

                    <NavLink 
                        className={({ isActive }) => `nav-item nav-link ${ isActive ? 'active':''}`} 
                        to="/consulta"
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
                    <button className='nav-item nav-link btn'>
                        Loguot
                    </button>

                </ul>
            </div>
        </nav>
    )
}