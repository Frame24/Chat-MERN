const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const request = require('superagent')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Пароль должен состоять минимум из 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Некорректные данные при регистрации'})
            }

            const {email, password} = req.body
            const candidate = await User.findOne({email: email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email: email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            console.log(e)
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email: email})

            if (!user) {
                return res.status(400).json({message: 'Неверно введен email или пароль'})
            }

            const isPasswordMatches = await bcrypt.compare(password, user.password)

            if (!isPasswordMatches) {
                return res.status(400).json({message: 'Неверно введен email или пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get("jwtSecret"),
                {expiresIn: '24h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

// /api/auth/login github ForbiddenForbiddenForbiddenForbiddenForbiddenForbiddenForbiddenForbidden
/*router.get(
    '/login/github',
    [],
    async (req, res) => {
        try {
            const {query} = req
            let data = ""
            await request
                .post('https://github.com/login/oauth/access_token')
                .send({
                    client_id: "3e207861a5c5c90739a4",
                    client_secret: "680baa8df459acb936e238924808f0f31f04ad7a",
                    code: req.query.code,
                })
                .set('Accept', 'application/json')
                .then(result => {
                    data = result.body;
                    console.log(data)
                    /!*res.send(data)*!/
                })
            console.log("Ты сюда вообще заходишь?")
            await request
                .get('https://api.github.com/user')
                .set('Authorization', 'token ' + data.access_token)
                .then(result => {
                    console.log(result.body)
                    res.send(result.body)
                });

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })
router.get(
    '/login/github/token',
    [],
    async (req, res) => {
        try {
            console.log(req.query)
            res.send({qwe: "req"})
            /!*const token = req.params.access_token
            console.log(req.params.access_token)
            await request
                .get('https://api.github.com/user')
                .set('Authorization', 'token ' + token)
                .then(result => {
                    console.log(result.body)
                    res.send(result.body)
                });*!/
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })*/


/*// /api/auth/login vk
router.get(
    '/oauth',
    [],
    async (req,res)=>{
        try{
            await request
                .get("https://oauth.vk.com/authorize?client_id=8031075&display=page&redirect_uri=http://localhost:5000/api/auth/login/vk&scope=email&response_type=code")
                .then(result=>{
                    res.send(result.body)
                })
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)*/
router.get(
    '/login/vk',
    [],
    async (req, res) => {
        try {
            //Получаем email юзера
            const {query} = req
            console.log(req.query.code)
            let data = ""
            await request
                .post('https://oauth.vk.com/access_token' +
                    '?client_id=8031075' +
                    '&redirect_uri=http://localhost:5000/api/auth/login/vk' +
                    '&client_secret=j5XogOTe0Y8b6I5s21qJ' +
                    '&code=' + req.query.code
                    )
                .then(result => {
                    data = result.body;
                    console.log(data)
                    //res.send(data)
                })
            /*
            to get user info
            await request
                .get('https://api.vk.com/method/users.get' +
                    '?user_id=' + data.user_id +
                    '&access_token=' + data.access_token +
                    '&fields=sex,contacts' +
                    '&v=5.131')
                .then(result => {
                    console.log(result.body)
                    res.redirect("http://localhost:3000/")
                    //res.send(result.body)
                });*/

            const email = data.email
            let user = await User.findOne({email: email, isOauth: true})
            if (!user) {
                user = new User({email: email, isOauth: true})
                await user.save()
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get("jwtSecret"),
                {expiresIn: '24h'}
            )
            console.log(user.id)
            res.redirect(config.get("clientUrl") + `/${token}/${user.id}`)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

module.exports = router