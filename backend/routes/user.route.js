import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, softDelete, updateUser } from '../controllers/user.controller.js';


const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.put('/del/:id', softDelete);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', loginUser); // Login

export default userRouter;