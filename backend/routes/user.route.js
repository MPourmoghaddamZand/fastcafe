import express from 'express'
import { createUser, deleteUser, getAllUsers, getProfile, getUserById, loginUser, softDelete, updateUser } from '../controllers/user.controller.js';
import verifyToken from '../middleware/verifyToken.js';


const userRouter = express.Router();

userRouter.get('/', verifyToken, getAllUsers);
userRouter.get('/profile', verifyToken, getProfile)
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.put('/del/:id', softDelete);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', loginUser);

export default userRouter;