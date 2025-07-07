import User from "../models/user.model.js"
import bcrypt from 'bcrypt'

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({});
        res.status(200).json({ success: 'true', data: user })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: 'false', error: err })
    }
}


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk({ id: id })
        res.status(200).json({ success: 'true', data: user })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: 'false', error: err })
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password)
            return res.status(400).json({ success: 'false', error: 'Compelete Fields' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            password: hashedPassword
        })
        res.status(201).json({ success: 'true', data: user })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: 'false', error: err })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;

        if (!name || !password)
            return res.status(400).json({ success: 'false', error: 'Compelete Fields' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.update({
            name,
            password: hashedPassword
        },
            { where: { id: id } }
        )
        if (newUser[0] !== 1)
            return res.status(400).json({ success: 'false', error: "Can't Update" })
        const updatedUser = await User.findByPk(id);
        res.status(200).json({ success: true, data: updatedUser });

    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: false, error: err })
    }
}

export const softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.update({ isDeleted: true }, { where: { id: id } })
        res.status(200).json({ success: true, data: user });

    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: false, error: err })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.destroy({ where: { id: id } })
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: false, error: err })
    }
}