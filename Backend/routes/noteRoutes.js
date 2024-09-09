import express from 'express'
import multer from 'multer'
import shID from 'shortid'
import slugify from 'slugify'
import path from 'path'
import { fileURLToPath } from "url"
import { noteSubmit } from '../controllers/noteControllers.js'
import { deleteNote } from '../controllers/noteControllers.js'
import { getAllNotes } from '../controllers/noteControllers.js'

const router = express.Router()


const fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(path.dirname(fileName))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirName, 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shID.generate() + '-' + slugify(file.originalname))
    }
})

const upload = multer({ storage })

router.post('/notesubmit', upload.single('file'), noteSubmit)
router.post('/notedelete', deleteNote)
router.post('/getallnotes', getAllNotes)

export default router