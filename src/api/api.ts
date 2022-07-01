import axios from "axios";

export const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4444/api'
    : "https://gothic-remake.herokuapp.com/api/";

export const instance = axios.create({
    baseURL,
    //withCredentials: true
});