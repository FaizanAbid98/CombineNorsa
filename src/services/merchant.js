import { getToken } from "./auth"
import address from "./address"
import axios from "axios"

export default function getMerchantList() {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"
    return axios.get(address + '/api/merchants/getAllMerchants', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getMerchantData(id) {
    console.log(id)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.get(address+'/api/merchants/getMerchantById/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function updateMerchant(formData) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address+'/api/merchants/upsertMerchant', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function addMerchant(formData) {
    console.log(formData)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address+'/api/merchants/upsertMerchant', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function deleteMerchant(id) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/merchants/deleteMerchant/'+ id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
