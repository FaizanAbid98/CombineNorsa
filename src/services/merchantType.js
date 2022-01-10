import { getToken } from "./auth"
import address from "./address"
import axios from "axios"

export default function getMerchantTypeList() {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"
    return axios.get(address + '/api/merchants/getAllMerchantTypes', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getMerchantTypeData(id) {
    console.log(id)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.get(address+'/api/merchants/getMerchantTypeById/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function getMerchantTypeDiscountByMerchantType_id(MerchantType_id) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.get(address+'/api/merchants/getMerchantTypeDiscountByMerchantType_id/' + MerchantType_id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}
export function updateMerchantType(formData) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address+'/api/merchants/upsertMerchantType', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function updateMerchantTypeDiscount(formData) {
    console.log(formData)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address+'/api/merchants/upsertMerchantTypeDiscount', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function addMerchantType(formData) {
    console.log(formData)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address+'/api/merchants/upsertMerchantType', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function addMerchantTypeDiscount(formData) {
    console.log(formData)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.post(address+'/api/merchants/createMerchantTypeDiscount', formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function deleteMerchantType(id) {
    alert(id)
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/merchants/deleteMerchantType/'+ id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function deleteMerchantTypeDiscountByMerchantType_id(id) {
    const token = getToken()
    if (!token) return "Authentication Fail Sign In agian"

    return axios.delete(address + '/api/merchants/deleteMerchantTypeDiscountByMerchantType_id/'+ id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}