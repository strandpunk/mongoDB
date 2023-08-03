import { useContext, useEffect, useState } from "react"
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
            getLoggedIn()
            //console.log(getLoggedIn())

        } catch (error) {
            // console.log(error.response.data);
            const x = error.response.data
            setFormError(x.errorMessage)
        }
    }

    // VALIDATION

    const [nameError, setNameError] = useState('Это поле не может быть пустым')
    const [emailError, setEmailError] = useState('Поле почты не может быть пустым')
    const [passwordError, setPasswordError] = useState('Поле пароля не может быть пустым')
    const [passwordVerifyError, setPasswordVerifyError] = useState('Это поле не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if (nameError || emailError || passwordError || passwordVerifyError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError, passwordError, passwordVerifyError])


    const nameHandler = (e) => {
        setName(e.target.value)
        if (!e.target.value) {
            setNameError('Это поле не может быть пустым')
        } else {
            setNameError('')
        }
    }

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

        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;

        const passwordLength = e.target.value.length;
        const uppercasePassword = uppercaseRegExp.test(e.target.value);
        const lowercasePassword = lowercaseRegExp.test(e.target.value);
        const digitsPassword = digitsRegExp.test(e.target.value);
        const specialCharPassword = specialCharRegExp.test(e.target.value);
        const minLengthPassword = minLengthRegExp.test(e.target.value);


        if (passwordLength === 0) {
            setPasswordError('Password is empty');
        } else if (!uppercasePassword) {
            setPasswordError('At least one Uppercase');
        } else if (!lowercasePassword) {
            setPasswordError('At least one Lowercase');
        } else if (!digitsPassword) {
            setPasswordError('At least one digit');
        } else if (!specialCharPassword) {
            setPasswordError('At least one Special Characters');
        } else if (!minLengthPassword) {
            setPasswordError('At least minumum 8 characters');
        } else {
            setPasswordError('');
        }
    }


    const confirmPasswordHandler = (e) => {

        setPasswordVerify(e.target.value)

        if (e.target.value.length === 0) {
            setPasswordVerifyError('Это поле не может быть пустым');
        } else (
            setPasswordVerifyError('')
        )
    }


    const Pass = (e) => {
        if (passwordVerify.length === 0) {
            setPasswordVerifyError('Это поле не может быть пустым')
        } else {
            setPasswordVerifyError('')
        }
    }

    return (
        <>
            <div className='form_placer'>
                <div className='form-wrapper'>
                    <form onSubmit={register} className="form">

                        <h1 style={{ textAlign: 'center' }}>Регистрация</h1>

                        <label>Name</label>
                        <input onChange={(e) => nameHandler(e)} value={name} name='name' type='text' placeholder='Enter your name....' />
                        <div style={{ color: '#660000', marginBottom: '40px' }}>{nameError}</div>

                        <label>Email</label>
                        <input onChange={(e) => emailHandler(e)} value={email} name='email' type='text' placeholder='Enter your email....' />
                        <div style={{ color: '#660000', marginBottom: '40px' }}>{emailError}</div>

                        <label>Password</label>
                        <input onChange={(e) => passwordHandler(e)} value={password} name='password' type='password' placeholder='Enter your password....' />
                        <div style={{ color: '#660000', marginBottom: '40px' }}>{passwordError}</div>

                        <label>Confirm password</label>
                        <input onChange={(e) => confirmPasswordHandler(e)} value={passwordVerify} name='confirmPassword' type='password' placeholder='Confirm your password...' />
                        <div style={{ color: '#660000', marginBottom: '40px' }}>{passwordVerifyError}</div>

                        <div style={{ color: '#660000', marginBottom: '40px' }}>{formError}</div>
                        <button onClick={e => { Pass(e) }} disabled={!formValid} type='submit' className='registerbtn'>ЗАРЕГИСТРИРОВАТЬСЯ</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp