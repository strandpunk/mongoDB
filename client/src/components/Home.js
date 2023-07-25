import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './Home.css'
import Data from '../data/Data'

const Home = () => {

    const { loggedIn } = useContext(AuthContext)
    // const navigate = useNavigate()

    return (
        // content-wrapper?
        <main>
            {loggedIn === true &&
                (
                    <>
                        <div className="home-wrapper">
                            <div className="home-main">
                                <div className='user-info'></div>
                                <section>
                                    <Data />
                                </section>

                            </div>
                        </div>
                    </>
                )}

            {loggedIn === false &&
                (
                    <>
                        <div>
                            <h1>Register or sign up</h1>
                        </div>
                    </>
                )}
        </main>
    )
}

export default Home