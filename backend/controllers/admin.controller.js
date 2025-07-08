import Admin from "../models/admin.model.js"
import bcrypt from 'bcrypt'
export const getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.findAll({})
        if (admins.length === 0) {
            return res.status(400).json({ success: false, error: "Can't Find Admin" })
        }
        res.status(200).json({ success: true, data: admins })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

export const createAdmin = async (req, res) => {
    try {
        const { name, password, role } = req.body
        if (!name || !password)
            return res.status(400).json({ success: false, error: "Please Compelete Fields" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = await Admin.create({
            name,
            password: hashedPassword,
            role
        })

        if (!newAdmin)
            return res.status(400).json({ success: false, error: "Can't Add Admin" })

        res.status(200).json({ success: true, message: 'New Admin Added!' })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}


export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const { name, password, role } = req.body

        let updateData = { name, role }
        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }
        const updateAdmin = await Admin.update(
            updateData
            , {
                where: { id: id }
            })
        if (updateAdmin[0] !== 1)
            return res.status(400).json({ success: false, error: "Can't Update Admin" })
        res.status(200).json({ success: true, message: 'Update Admin!' })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}


export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params
        const admin = await Admin.findByPk(id, { attributes: { exclude: ['password'] } })

        if (!admin)
            return res.status(400).json({ success: false, error: "Can't Find Admin" })

        // const { password, ...safeAdmin } = admin.toJSON();
        res.status(200).json({ success: true, data: admin })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

export const getAdminsByRole = async (req, res) => {
    try {
        const { role } = req.params // ✅ درست شد

        if (!role)
            return res.status(400).json({ success: false, error: "Please complete the field" })

        const admins = await Admin.findAll({ where: { role }, attributes: { exclude: ['password'] } }) // ✅ await اضافه شد

        if (admins.length === 0) {
            return res.status(404).json({ success: false, error: "No admins found for this role" })
        }

        res.status(200).json({ success: true, message: 'Success Fetch', data: admins }) // ✅ data اضافه شد

    } catch (err) {
        res.status(500).json({ success: false, error: err.message || err })
    }
}
