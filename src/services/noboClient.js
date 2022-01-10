import address from "./address"
import axios from "axios"



export default function addClient(formData) {

    return axios.post(address + '/api/public/clients/upsertClient', formData)
}
export function getActiveClientList() {

    return axios.get(address + '/api/public/clients/getActiveClientList')
}

export function getNextNK_Id() {

    return axios.get(address + '/api/public/clients/getNextNK_Id')
}

export function addClientImage(formData) {

    return axios.post(address + '/api/public/clientProfilePicture/createImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function addSalarySlips(formData) {

    return axios.post(address + '/api/css/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function addBankStatement(formData) {

    return axios.post(address + '/api/cbs/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}