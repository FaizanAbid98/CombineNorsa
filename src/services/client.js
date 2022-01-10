import { getToken } from "./auth"
import address from "./address"
import axios from "axios";

export default function getClientList() {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"
    return axios.get(address + '/api/clients/getAllClients', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getActiveClientList() {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"
    return axios.get(address + '/api/clients/getAllActiveClients', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function getNextId() {

    return axios.get(address + '/api/public/clients/getNextK_Id')
}

export function getNextDId() {
    const token = getToken()
    return axios.get(address + '/api/clients/getNextD_Id', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function getClientData(id) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.get(address + '/api/clients/getClientById/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function getImageByClientId(id) {
    console.log("hh" + id)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.get(address + '/api/clientProfilePicture/getImageByClientId/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function updateClient(formData) {
    console.log(formData)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address + '/api/clients/upsertClient', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function addClient(formData) {

    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address + '/api/clients/upsertClient', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function deleteClient(id) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/clients/deleteClient/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function deleteClientImage(Client_id){
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/clientProfilePicture/delete/' + Client_id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function deleteClientSalarySlips(Client_id){
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/css/delete/' + Client_id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function deleteClientBankStatement(Client_id){
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/cbs/delete/' + Client_id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function addClientImage(formData) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"
    return axios.post(address + '/api/clientProfilePicture/createImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    })
}
