const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()
const request = require('superagent')

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user.vkUserName){
            res.json(`${user.vkUserName} (${user.email})`)
        }
        else{
            res.json(user.email)
        }
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id/chats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user.chats)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/:id/updateVKUsername', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await request
            .get('https://api.vk.com/method/users.get' +
                '?user_id=' + user.vkUserId +
                '&access_token=' + user.vkAccessToken +
                '&fields=sex,contacts' +
                '&v=5.131')
            .then(result => {
                user.vkUserName = `${result.body.response[0].first_name} ${result.body.response[0].last_name}`
            });
        await user.save()
        res.status(200).json({message: 'Имя изменено'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router