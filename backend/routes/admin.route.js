import express from 'express'
import { createAdmin, getAdminById, getAllAdmin, updateAdmin, getAdminsByRole } from '../controllers/admin.controller.js';

const adminRouter = express.Router();


adminRouter.get('/', getAllAdmin)
adminRouter.get('/:id', getAdminById)
adminRouter.get('/by-role/:role', getAdminsByRole)
adminRouter.post('/', createAdmin)
adminRouter.put('/:id', updateAdmin)
// adminRouter.put('/:id', softDeleteAdmin)
// adminRouter.delete('/:id', deleteAdmin)


export default adminRouter