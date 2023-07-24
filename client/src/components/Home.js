import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './Home.css'
import Data from '../data/Data'

const Home = () => {

    const { loggedIn } = useContext(AuthContext)
    // const navigate = useNavigate()

    return (
        <main>
            {loggedIn === true &&
                (
                    <>
                        <div className="home-wrapper">
                            <div className="home-main">
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
                        <div className="home-wrapper">
                            <div className="home-main">
                                <section>
                                    Register or sign in
                                    {/* {datas?.map(d => <DataItem {...d} key={d._id} onClick={handleDataItemClick(d)} />)} */}
                                </section>

                            </div>
                        </div>
                    </>
                )}
        </main>
    )
}

export default Home