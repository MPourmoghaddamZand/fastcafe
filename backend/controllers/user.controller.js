import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json({ success: 'true', data: user })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: 'false', error: err })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params || req.user.id
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
        console.log("🔥 Received name:", name);
        if (!name || !password)
            return res.status(400).json({ success: false, error: 'Compelete Fields' })

        const existingUser = await User.findOne({
            where: {
                name,
                isDeleted: false
            }
        });
        if (existingUser) {
            console.log(existingUser)
            return res.status(409).json({ success: false, error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            password: hashedPassword
        }, { attributes: { exclude: ['password'] } })
        // const { password: _discarded, id: _discardedID, ...userWithoutPassword } = user.toJSON();
        res.status(201).json({ success: true })
    } catch (err) {
        console.log("Error: ", err)
        res.status(500).json({ success: false, error: err })
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

export const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password)
            return res.status(400).json({ success: false, error: 'Compelete Fields' })

        const user = await User.findOne({ where: { name } })

        if (!user)
            return res.status(401).json({ success: false, error: 'Invalid credentials' })

        const compairPassword = await bcrypt.compare(password, user.password)

        if (!compairPassword)
            return res.status(401).json({ success: false, error: 'Wrong Password' })
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            success: true,
            data: { userName: user.name },
            token
        });

    } catch (err) {

        console.log("Error: ", err)
        res.status(500).json({ success: false, error: err })
    }
}

export const getProfile = async (req, res) => {
    try {
        console.log('req.user:', req.user);
        console.log('req.headers.authorization:', req.headers.authorization);

        res.status(200).json({ message: 'Test endpoint works' });
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ success: false, error: err.message });
    }
};
