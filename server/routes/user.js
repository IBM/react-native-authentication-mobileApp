
import express from 'express'
import { createUser, loginUser, getUser, getAllUser, getQuestions, updatePassword, changePassword } from "../controllers/users.js"


const router = express.Router()

router.post('/', createUser) 
router.post('/login', loginUser) 
router.get('/:id', getUser) 
router.get('/:role/:email', getAllUser) 
router.post('/questions', getQuestions) 
router.post('/update-password', updatePassword)
router.post('/change-password', changePassword) 

export { router };