import axios from "axios"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "2800ad43-9529-4c23-8608-2e6f8b2f9c1a",
    },
})
