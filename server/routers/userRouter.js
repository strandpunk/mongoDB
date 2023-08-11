const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')

// register

router.post('/', async (req, res) => {
    try {
        const { name, email, password, passwordVerify } = req.body

        // validation

        if (!name || !email || !password || !passwordVerify)
            return res
                .status(400)
                .json({ errorMessage: 'Please enter all required fields.' });

        if (password.lenght < 6)
            return res
                .status(400)
                .json({ errorMessage: 'Please enter a password of at least 6 characters.' });

        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ errorMessage: 'Please enter the same password twice.' });

        const existingUser = await User.findOne({ email: email })
        if (existingUser)
            return res
                .status(400)
                .json({ errorMessage: 'An account with this email already exists.' });

        // hash the password

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // create avatar

        avatar = 'avatar.png'
        // save a new user account to database

        const newUser = new User({
            name, email, passwordHash, avatar
        })

        const savedUser = await newUser.save()

        // sign the token

        const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET)

        // send the token in a HTTP-only cookie

        res.cookie('token', token, {
            httpOnly: true
        })
            .send()

    } catch (error) {
        consle.error(error)
        res.sendStatus(500).send()
    }
})


// log in

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // validation

        if (!email || !password)
            return res
                .status(400)
                .json({ errorMessage: 'Please enter all required fields.' });

        const existingUser = await User.findOne({ email })
        if (!existingUser)
            return res
                .status(401)
                .json({ errorMessage: 'Wrong email or password.' });


        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash)
        if (!passwordCorrect)
            return res
                .status(401)
                .json({ errorMessage: 'Wrong email or password.' });


        // sign the token

        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET)

        // send the token in a HTTP-only cookie

        res.cookie('token', token, {
            httpOnly: true
        })
            .send()


    } catch (error) {
        console.error(error)
        res.sendStatus(500).send()
    }
})

router.get('/logout', (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(0)
    })
        .send()
})

router.get('/loggedIn', (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) return res.json(false)

        jwt.verify(token, process.env.JWT_SECRET)

        res.send(true)
    } catch (error) {
        res.json(false)
    }
})

// get user info

router.get('/info', auth, async (req, res) => {
    try {

        const userID = req.user
        const userInfo = await User.findById(userID).select('-passwordHash') //.select('-passwordHash')
        res.send({
            name: userInfo.name,
            email: userInfo.email,
            createdAt: userInfo.createdAt,
            avatar: userInfo.avatar
        })
    } catch (error) {
        console.error(error)
        res.sendStatus(500).send()
    }
})



//----------------------------------------------------------
// update user profile picture

router.put('/update', auth, async (req, res) => {
    try {
        const userID = req.user
        console.log(userID)
        const updated_user = await User.findOneAndUpdate({ _id: userID }, req.body, { new: true })
        console.log(updated_user)
        res.status(200).send(updated_user)
        // console.log(updated_user.name)
    } catch (error) {
        console.error(error)
        res.sendStatus(500).send()
    }

})
//----------------------------------------------------------

module.exports = router