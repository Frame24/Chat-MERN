const {Router} = require('express')
const Note = require('../models/Note')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()

router.post('/create', auth, async (req, res) => {
    try{
        const {caption,description} = req.body
        const code = shortid.generate()

        const note =  new Note(
            {caption: caption,description: description, owner:req.user.userId}
        )

        await note.save()
        return res.status(201).json({note})
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/update/:id', auth, async (req, res) => {
    try{
        const {caption,description} = req.body
        let note =  await Note.findById(req.params.id)
        note.caption = caption
        note.description = description
        await note.save()
        return res.status(201).json({note})
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try{
        const notes = await Note.find({owner: req.user.userId})
        res.json(notes)
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try{
        const dbres = await Note.findByIdAndDelete(req.params.id)
        return res.status(201).json({message:`Записка успешно удалена!`})
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try{
        const note = await Note.findById(req.params.id)
        res.json(note)
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router