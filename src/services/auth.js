import address from "./address";


import axios from "axios";


export default function checkUser() {
    const storage = window.localStorage;
    const token = storage.getItem("token");
    if (token) {
        return true
    }
    return false
}
export function getToken(){
    const storage = window.localStorage;
    return storage.getItem("token")
}

export async function login(formData) {
    // requires email and password only
    // role 0 is admin
    // role 1 is not admin 
    // role 2 is not not admin XD
    const { data } = await axios.post(address + '/api/auth/login', formData);
    const accessToken = data.data['accessToken'];
    const role = data.data.isAdmin;
    if (accessToken) {
        const storage = window.localStorage;
        storage.setItem('token', accessToken);
        storage.setItem("role", role);
    }
    else {
        console.log("Token error here bro");
    }
}

export async function register(formData) {
    //requires email and password only rest is not needed
    const { data } = await axios.post(address + '/api/auth/signup', formData);
    console.log(data)

}

export function getRole() {
    const storage = window.localStorage;
    return storage.getItem("role")
}

