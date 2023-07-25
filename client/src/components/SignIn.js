import { useNavigate } from "react-router"
import { useContext, useEffect, useState } from "react"
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
            // console.log(error.response.data);
            const x = error.response.data
            setFormError(x.errorMessage)
        }
    }


    // VALIDATION

    const [emailError, setEmailError] = useState('Поле почты не может быть пустым')
    const [passwordError, setPasswordError] = useState('Поле пароля не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if ( emailError || passwordError ) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])


    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректная почта')
            if (!e.target.value) {
                setEmailError('Поле почты не может быть пустым')
            }
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (!e.target.value) {
            setPasswordError('Поле пароля не может быть пустым')
        } else {
            setPasswordError('')
        }
    }

    return (
        <>
            <div className='form_placer'>
                <div className='form-wrapper'>
                    <form onSubmit={login} className="form">

                        <h1 style={{ textAlign: 'center' }}>Enter</h1>

                        <label>Email</label>
                        <input onChange={(e) => emailHandler(e)} value={email} name='email' type='text' placeholder='Enter your email....' />
                        <div style={{ color: '#660000', marginBottom: '40px' }}>{emailError}</div>

                        <label>Password</label>
                        <input onChange={(e) => passwordHandler(e)} value={password} name='password' type='password' placeholder='Enter your password....' />
                        <div style={{ color: '#660000', marginBottom: '40px' }}>{passwordError}</div>

                        <div style={{ color: '#660000', marginBottom: '40px' }}>{formError}</div>
                        <button type='submit' disabled={!formValid} className='enterbtn'>ENTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn