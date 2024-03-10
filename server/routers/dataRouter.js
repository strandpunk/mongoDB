const router = require('express').Router()
const Data = require('../models/dataModel')
const auth = require('../middleware/auth')
const { ObjectId } = require('mongodb');

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
        const data = await Data.find({ owner: user })
        // console.log(data)
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
})

router.get('/friend/:friendId', auth, async (req, res) => {
    try {
        const friendId = req.params.friendId; // Получаем friendId из параметров URL запроса
        const data = await Data.find({ owner: friendId });
        //console.log(data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.get('/:dataId', auth, async (req, res) => {
    try {
        const user = req.user;
        const dataId = req.params.dataId; // Получаем dataId из параметров URL запроса

        const message = await Data.findOne({ _id: dataId });
        const userObjectId = new ObjectId(user); // Преобразуем строку user в ObjectId
        //console.log(message.owner);
        //console.log(userObjectId);

        if (userObjectId.equals(message.owner)) { // Используем метод equals для сравнения ObjectId
            await Data.deleteOne({ _id: dataId });
            res.json();
        } else {
            res.status(401).json({ errorMessage: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

module.exports = router