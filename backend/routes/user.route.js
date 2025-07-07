import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, softDelete, updateUser } from '../controllers/user.controller.js';


const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById)
userRouter.post('/', createUser)
userRouter.put('/:id', updateUser)
userRouter.put('/del/:id',softDelete)
userRouter.delete('/:id',deleteUser)

export default userRouter;