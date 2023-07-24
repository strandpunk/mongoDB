import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Layout.css'

const Layout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className='layout-container'>
                <Outlet />
            </main>

            <footer className='layout-footer'>2023</footer>
        </>
    )
}

export default Layout