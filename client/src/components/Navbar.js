import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
import './Navbar.css'

const Navbar = () => {
    const { loggedIn } = useContext(AuthContext)

    return (
        <header className='navbar-header'>
            <Link to={'/'}><img id='Logo' src="/1618916.svg" alt="Logo" className="cursor-pointer" /></Link>
            <nav>
                {loggedIn === false && (
                    <>
                        <div className="navbar-linkWrapper">
                            <NavLink className='navbar-navlink' to='/signin' element={<SignIn />}>Sign in</NavLink>
                            <NavLink className='navbar-navlink' to='/signup' element={<SignUp />}>Sign up</NavLink>
                        </div>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <div className="navbar-linkWrapper">
                            <div className='navbar-user'>User</div>
                            <SignOut />
                        </div>
                    </>
                )}
            </nav >
        </header >
    )
}



export default Navbar