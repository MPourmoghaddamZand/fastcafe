import { create } from 'zustand'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export const useSign = create((set, get) => ({
    loginStatus: false,
    changeStatus: () => {
        set({ loginStatus: !get().loginStatus });
    },
    getUserData: async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await axios.get(`${BASE_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.data.user) {
                get().setUser(response.data.user)
            } else {
                localStorage.removeItem('token')
            }
        } catch (err) {
            console.log("dd")
        }
    },
    signUpUser: async (name, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/users`,
                {
                    name,
                    password
                }
            )
            console.log(response.data)
        } catch (err) {
            console.log(err)
            if (err.response) {
                get().setError(err.response.data.error)
            }
        }
    },
    loginUser: async (name, password) => {
        console.log("first")
        try {
            const response = await axios.post(`${BASE_URL}/api/users/login`,
                {
                    name,
                    password
                }
            )
            if (response.data.success) {
                console.log("res: ", response.data.data)
                get().setUser(response.data.data)
                localStorage.setItem('token', response.data.token)
            }
        } catch (err) {
            console.log(err)
            if (err.response) {
                get().setError(err.response.data.error)
            }
        }
    },
    error: '',
    setError: (err) => { set({ error: err }) },
    user: localStorage.getItem('user') || null,
    setUser: (user) => { set({ user: user }) }
}))

export default useSign;