import { useNavigate } from "react-router"
import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import axios from 'axios'
import './SignIn.css'


const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault()

        try {
            const loginData = {
                email,
                password,
            }

            await axios.post('http://localhost:5000/auth/login', loginData)
            await getLoggedIn()
            navigate('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='form_placer'>
                <div className='form-wrapper'>
                    <form onSubmit={login} className="form">

                        <h1 style={{ textAlign: 'center' }}>Enter</h1>

                        <label>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} name='email' type='text' placeholder='Enter your email....' />

                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} name='password' type='password' placeholder='Enter your password....' />

                        <button type='submit' className='enterbtn'>ENTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn