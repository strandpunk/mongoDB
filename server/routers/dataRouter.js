const router = require('express').Router()
const Data = require('../models/dataModel')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {

        const { content } = req.body
        const user = req.user

        const newData = new Data({
            content,
            owner: user
        })

        const savedData = await newData.save()

        res.json(savedData)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = req.user
        const data = await Data.find({owner: user})
        // console.log(data)
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
})

module.exports = router