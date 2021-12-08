const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user.email)
        res.json(user.email)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router