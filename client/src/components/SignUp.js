import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import AuthContext from "../context/AuthContext";
import axios from 'axios'
import './SignUp.css'


const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    async function register(e) {
        e.preventDefault()

        try {
            const registerData = {
                name,
                email,
                password,
                passwordVerify
            }

            await axios.post('http://localhost:5000/auth/', registerData)
            navigate('/')
            console.log(getLoggedIn())

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='form_placer'>
                <div className='form-wrapper'>
                    <form onSubmit={register} className="form">

                        <h1 style={{ textAlign: 'center' }}>Registration</h1>

                        <label>Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} name='name' type='text' placeholder='Enter your name....' />

                        <label>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} name='email' type='text' placeholder='Enter your email....' />

                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} name='password' type='password' placeholder='Enter your password....' />

                        <label>Confirm password</label>
                        <input onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify} name='confirmPassword' type='password' placeholder='Confirm your password...' />

                        <button type='submit' className='registerbtn'>REGISTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp