const {Router} = require('express')
const Chat = require('../models/Chat')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const {validationResult} = require("express-validator");
const {check} = require("express-validator");
const bcrypt = require('bcryptjs')
const router = Router()

router.post('/create', auth, async (req, res) => {
    try {
        const {chatName, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const chat = new Chat({name: chatName, password: hashedPassword, owner: req.user.userId})
        chat.users.push(req.user.userId);
        await chat.save()

        res.status(201).json({message: 'Чат создан'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post(
    '/join',
    [
        check('chatId', 'Введите id чата').exists(),
        check('password', 'Введите пароль чата').exists(),
        /*check('email', 'Войдите в систему').isEmpty(),
        check('userpassword', 'Войдите в систему').isEmpty(),*/
    ],
    auth,
    async (req, res) => {
        try {

            const errors = validationResult(req)
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {chatId, password, email, userpassword} = req.body

            const chat = await Chat.findById(chatId)


            if (!chat) {
                return res.status(400).json({message: 'Неверно введен id или пароль'})
            }

            const isPasswordMatches = await bcrypt.compare(password, chat.password)

            if (!isPasswordMatches) {
                return res.status(400).json({message: 'Неверно введен id или пароль'})
            }

            /*const user = await User.findOne({email: email})
            if (!user) {
                return res.status(400).json({message: 'Войдите в систему'})
            }

            const isPasswordMatchesForUser = await bcrypt.compare(userpassword, user.password)

            if (!isPasswordMatchesForUser) {
                return res.status(400).json({message: 'Войдите в систему'})
            }*/
            if (chat.users.includes(req.user.userId)) {
                return res.status(400).json({message: 'Пользователь уже добавлен в чат'})
            }

            chat.users.push(req.user.userId);
            chat.save();

            return res.status(200).json({chat})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            console.log(e)
        }
    })

router.get('/:id', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
        if(!chat.users.includes(req.user.userId)){
            return res.status(400).json({message: 'Вы не состоите в данном чате'})
        }
        console.log(chat)
        res.json(chat)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router