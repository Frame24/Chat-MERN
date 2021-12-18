const {Router} = require('express')
const Chat = require('../models/Chat')
const User = require('../models/User')
const Message = require('../models/Message')
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
        const user = await User.findById(req.user.userId)
        const chat = new Chat({name: chatName, password: hashedPassword, owner: user._id})
        chat.users.push(user._id);
        await chat.save()

        user.chats.push(chat._id)
        await user.save();

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
    ],
    auth,
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {chatId, password} = req.body

            const chat = await Chat.findById(chatId)


            if (!chat) {
                return res.status(400).json({message: 'Неверно введен id или пароль'})
            }

            const isPasswordMatches = await bcrypt.compare(password, chat.password)

            if (!isPasswordMatches) {
                return res.status(400).json({message: 'Неверно введен id или пароль'})
            }

            const user = await User.findById(req.user.userId)

            if (chat.users.includes(user._id)) {
                return res.status(400).json({message: 'Пользователь уже добавлен в чат'})
            }

            chat.users.push(req.user.userId);
            await chat.save();

            user.chats.push(chat._id)
            await user.save();

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
        res.json(chat)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/:id/message', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
        if(!chat.users.includes(req.user.userId)){
            return res.status(400).json({message: 'Вы не состоите в данном чате'})
        }

        if(req.body.newMessage === ""){
            return res.status(400).json({message: 'Попытка отправки пустого сообщения'})
        }
        console.log(req.body.newMessage)
        const message = new Message({user: req.user.userId, text: req.body.newMessage, chat: chat._id})
        await message.save()
        chat.history.push(message._id)
        await chat.save()
        res.status(200).json(message)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        console.log(e)
    }
})

router.get('/:roomId/message/:messageId', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.roomId)
        if(!chat.users.includes(req.user.userId)){
            return res.status(400).json({message: 'Вы не состоите в данном чате'})
        }
        if(!chat.history.includes(req.params.messageId)){
            return res.status(400).json({message: 'Сообщение не принадлежит данному чату'})
        }
        const message = await Message.findById(req.params.messageId)
        res.status(200).json(message)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        console.log(e)
    }
})
module.exports = router